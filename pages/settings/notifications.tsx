import { NextPage } from 'next';
import { Container, Heading, Divider, Flex } from 'theme-ui';
import NotificationsForm from '../../components/notifications/NotificationsForm';


// Dodanie formularza umożliwiającego dodawanie powiadomień, które będą wyświetlane po stronie aplikacji mobilnej:

// content (tablica obiektów), który pozwala na dodanie wielu wersji językowych, np. poprzez dynamiczne dodawanie wierszy:

// title: string - który będzie tytułem wyświetlanego komunikatu

// text: string - treść powiadomienia

// language: string //wybierane na podstawie listy dostępnych języków zwracanych przez backend

// expirationDate?: Date - data, po której powiadomienie nie jest zwracane

// type: ‘documents’ | ‘info’ //przykładowe typy

// fallbackLanguage?: string // to pole miałoby decydować czy w przypadku braku języka w 
// danej wersji językowej ma być zwracany content wskazanej wersji jezykowej - 
// do zastanowienia, z uwagi na dużo większy narzut prac

const NotificationMenager: React.FC<{}> = () => {
    // props itp
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

                <NotificationsForm />

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