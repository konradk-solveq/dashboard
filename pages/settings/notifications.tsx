import React, { useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from "next/router";
import { Container, Heading, Divider, Flex, Button } from 'theme-ui';

 

const NotificationMenager: React.FC<{}> = () => {
    const router = useRouter();

    const handleClick = e => {
    e.preventDefault();
    router.push(`../notifications/NotificationsAdd`)
    }

    return (
        <Container>
            <Container p="30px" marginX="auto" sx={{ maxWidth: '1200px',}}>
            <Heading m="20px" sx={{ 
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'}}>
                    Powiadomienia
                </Heading>
                <Button onClick={handleClick}>Dodaj Powiadomienie</Button>

            </Container>
        </Container>
        
    )
}

const NotificationsPage: NextPage<{}> = (props) => {
    return (
        <>
            {/* Notifications Container - func/API */}
                <NotificationMenager />
            {/* Notifications Container - func/API */}
        </>
    );
};

export default NotificationsPage;