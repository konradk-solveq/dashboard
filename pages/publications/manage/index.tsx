import { NextPage } from 'next';
import React from 'react';
import { Container } from 'theme-ui';

import ManagePublicationContainer from '../../../components/contexts/publication/ManagePublication';
import ManagePublicationForm from '../../../components/publication/manage/ManagePublicationForm';

const ManagePublications: React.FC = () => {
    return (
        <Container p="30px" marginX="auto" sx={{ maxWidth: '1200px', height: '100%' }}>
            <ManagePublicationForm />
        </Container>
    );
};

const PublicationsPage: NextPage<{}> = (props) => {
    return (
        <ManagePublicationContainer>
            <ManagePublications />
        </ManagePublicationContainer>
    );
};

export default PublicationsPage;
