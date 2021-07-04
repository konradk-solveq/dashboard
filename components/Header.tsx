import { signOut, useSession } from 'next-auth/client';
import Routing from 'next/link';
import React from 'react';
import { Button, Container, Flex, Link } from 'theme-ui';

const Header: React.FC<{}> = ({ children }) => {
    const [session, loading] = useSession();
    return (
        <Flex sx={{ minHeight: 48, flexDirection: 'row', padding: 2, justifyContent: 'space-between' }}>
            <Container>
                {session && (
                    <>
                        {session.user.email} <br />
                        <Button onClick={() => signOut()}>Wyloguj</Button>
                    </>
                )}
            </Container>
            <Container>
                <Routing passHref href="/routes">
                    <Link>Trasy</Link>
                </Routing>
            </Container>
        </Flex>
    );
};
export default Header;
