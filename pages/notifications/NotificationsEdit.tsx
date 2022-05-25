import React, { useContext } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Container, Heading, Grid, Label } from 'theme-ui';
import NotificationsContainer, { NotificationsContext } from '../../components/notifications/NotificationsApi';
import NotificationsGroupForm from '../../components/notifications/NotificationsGroupForm';

const NotificationsEdit: React.FC<{}> = () => {
    const router = useRouter();
    console.log(router.query);
    const { availableLanguages } = useContext(NotificationsContext);
    // first create template to display

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
                    Strona z wersjami językowymi powiadomienia
                </Heading>
                <Container>
                    <Grid gap={2} columns="100px 180px 2fr" marginBottom="10px">
                        <Label>Język</Label>
                        <Label>Tytuł</Label>
                        <Label>Treść</Label>
                    </Grid>
                </Container>
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
