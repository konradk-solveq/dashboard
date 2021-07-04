import NextAuth, { User } from 'next-auth';
import Providers from 'next-auth/providers';
import fetch from 'isomorphic-fetch';

interface UserPassword {
    email: string;
    passoword: string;
}
export interface UserResponse {
    access_token: string;
    refresh_token: string;
    expiration_date: Date;
    expires_in: number;
    user: {
        id: string;
        email: string;
    };
}

export default NextAuth({
    session: {
        maxAge: 14 * 24 * 60 * 60,
    },
    theme: 'dark',
    providers: [
        Providers.Credentials({
            name: 'ENP Login data',
            credentials: {
                email: { label: 'ENP Email', type: 'text', placeholder: 'kredes@kross.pl' },
                password: { label: 'Password', type: 'password' },
            },

            async authorize(credentials: UserPassword, req) {
                // Add logic here to look up the user from the credentials supplied
                const response = await fetch('http://app:3000/session/login', {
                    method: 'POST',
                    body: JSON.stringify({ ...credentials, admin: true }),
                    headers: { 'content-type': 'application/json' },
                });
                if (response.status < 400) {
                    const { user, access_token } = (await response.json()) as UserResponse;

                    return { ...user, image: access_token };
                } else {
                    throw new Error(response.statusText);
                }
            },
        }),
    ],
});
