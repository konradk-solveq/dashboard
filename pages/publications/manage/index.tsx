import { NextPage } from 'next';
import React from 'react';
import { Container } from '@mui/material/';

import ManagePublicationContainer from '../../../components/contexts/publication/ManagePublication';
import ManagePublicationForm from '../../../components/publication/manage/ManagePublicationForm';

const ManagePublications: React.FC = () => {
    return (
        <Container>
            <Container sx={{ maxWidth: '1200px', height: '100%', p: '30px', marginX: 'auto' }}>
                <ManagePublicationForm />
            </Container>
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
