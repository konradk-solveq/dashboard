import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Container, Heading, Button } from 'theme-ui';

const NotificationMenager: React.FC<{}> = () => {
    const router = useRouter();

    const handleClick = (e) => {
        e.preventDefault();
        router.push({ pathname: '../notifications/NotificationsEdit' });
    };

    return (
        <Container>
            <Container p="30px" marginX="auto" sx={{ maxWidth: '1200px' }}>
                <Heading
                    m="20px"
                    sx={{
                        textAlign: 'center',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    Powiadomienia
                    <Button onClick={handleClick} sx={{ textAlign: 'center', fontSize: '0.75em', cursor: 'pointer' }}>
                        Dodaj Powiadomienie
                    </Button>
                </Heading>
            </Container>
        </Container>
    );
};

const NotificationsPage: NextPage<{}> = (props) => {
    return (
        <>
            <NotificationMenager />
        </>
    );
};

export default NotificationsPage;
