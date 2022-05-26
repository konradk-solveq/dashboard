import React, { useContext, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Container, Heading, Grid, Label, Button } from 'theme-ui';
import NotificationsContainer, { NotificationsContext } from '../../components/notifications/NotificationsApi';
import NotificationsGroupForm from '../../components/notifications/NotificationsGroupForm';
import NotificationsForm from '../../components/notifications/NotificationsForm';

const NotificationsEdit: React.FC<{}> = () => {
    const router = useRouter();
    const [show, setShow] = useState(router.query.newNotificationShow);

    const { availableLanguages } = useContext(NotificationsContext);
    const handleOpen = () => {
        setShow(!show);
    };

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
                    Wersje językowe powiadomienia
                </Heading>
                <Container>
                    <Grid gap={2} columns="100px 180px 2fr" marginBottom="10px">
                        <Label>Język</Label>
                        <Label>Tytuł</Label>
                        <Label>Treść</Label>
                    </Grid>
                </Container>
                <Container
                    sx={{
                        maxWidth: '1200px',
                        marginTop: '30px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                    }}
                >
                    <Button onClick={handleOpen} sx={{ textAlign: 'center', fontSize: '1.3em' }}>
                        Dodaj kolejny język
                    </Button>
                </Container>
                <NotificationsForm show={show} setShow={setShow} availableLanguages={availableLanguages} />
                <NotificationsGroupForm availableLanguages={availableLanguages} />
            </Container>
        </Container>
    );
};

const NotificationsEditPage: NextPage<{}> = (props) => {
    return (
        <>
            <NotificationsContainer>
                <NotificationsEdit />
            </NotificationsContainer>
        </>
    );
};

export default NotificationsEditPage;
