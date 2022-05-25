import React, { useEffect, useState, useContext } from 'react';
import { NextPage } from 'next';
import { Container, Heading } from 'theme-ui';
import NotificationsForm from '../../components/notifications/NotificationsForm';
import NotificationsContainer, { NotificationsContext } from '../../components/notifications/NotificationsApi';

const NotificationsAdd: React.FC<{}> = () => {
    const { availableLanguages } = useContext(NotificationsContext);
    return (
        <Container>
            <Container p="30px" marginX="auto" sx={{ maxWidth: '1200px' }}>
                <Heading
                    m="20px"
                    sx={{
                        textAlign: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    Dodaj Powiadomienie
                </Heading>
                <NotificationsForm availableLanguages={availableLanguages} />
            </Container>
        </Container>
    );
};

const NotificationsAddPage: NextPage<{}> = (props) => {
    return (
        <>
            <NotificationsContainer>
                <NotificationsAdd />
            </NotificationsContainer>
        </>
    );
};

export default NotificationsAddPage;
