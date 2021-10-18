import React from 'react';
import { Flex } from 'theme-ui';

export default function Page({ }) {

    const data = {
        numberRoutes: 123,
        numberPublicRoutes: 45,
        numberUsers: 678,
    };

    const names = {
        numberRoutes: 'Liczba wszystkich tras',
        numberPublicRoutes: 'Lista tras opublikowanych',
        numberUsers: 'Liczba kont',
    }

    return (
        <Flex
            sx={{
                flexDirection: 'column',
                mx: 'auto',
            }}
        >
            <h1 style={{ textAlign: 'center' }}>Raport</h1>
            {Object.keys(data).map((key, index) => {
                const value = data[key];
                const name = names[key];
                return (<h2 style={{ textAlign: 'center' }}>{index + 1}. {name}: {value}</h2>)
            })}
        </Flex>
    );
}
