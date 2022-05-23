import React from 'react';
import { NextPage } from 'next';
import { Container, Heading } from 'theme-ui';

const NotificationsEdit: React.FC<{}> = () => {
    return (
        <Container>
            <Container p="30px" marginX="auto" sx={{ maxWidth: '1200px',}}>
            <Heading m="20px" sx={{ 
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'}}>
                    Strona z wersjami językowymi powiadomienia
                </Heading>

            </Container>
        </Container>
        
    )
}

const NotificationsEditPage: NextPage<{}> = (props) => {
    return (
        <>
         <NotificationsEdit />
        </>
    );
};

export default NotificationsEditPage;