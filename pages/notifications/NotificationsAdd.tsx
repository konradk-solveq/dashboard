import React,{ useEffect, useState }  from 'react';
import { NextPage } from 'next';
import { Container, Heading} from 'theme-ui';
import NotificationsForm from '../../components/notifications/NotificationsForm';


const NotificationsAdd: React.FC<{}> = () => {
    const [availableLanguages, setAvailableLanguages] = useState([
        {
            name: '',
            displayName: '',
        },
    ]);
    
    const getAvailableLanguages = async () => {
        const data = await fetch(`/api/application/config`);
        const result = await data.json();
        return setAvailableLanguages(result.langs);
    };
    
    useEffect(() => {
        getAvailableLanguages();
    }, []);
    return (
        <Container>
            <Container p="30px" marginX="auto" sx={{ maxWidth: '1200px',}}>
            <Heading m="20px" sx={{ 
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'}}>
                    Dodaj Powiadomienie
                </Heading>
                <NotificationsForm availableLanguages={availableLanguages} />
            </Container>
        </Container>
        
    )
}

const NotificationsAddPage: NextPage<{}> = (props) => {
    return (
        <>
            <NotificationsAdd />
        </>
    );
};

export default NotificationsAddPage;