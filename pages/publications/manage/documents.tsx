import { NextPage } from 'next';
import React from 'react';
import { Container, Typography } from '@mui/material/';
import DocumentUploadContainer from '../../../components/contexts/publication/DocumentUpload';

import UploadDocumentForm from '../../../components/publication/manage/UploadDocumentForm';

const DocumentUpload: React.FC = () => {
    return (
        <Container>
            <Container sx={{ maxWidth: '1200px', height: '80%', p: '30px', marginX: 'auto' }}>
                <Typography variant="h3" sx={{ textAlign: 'center', m: '20px' }}>
                    Dodaj Dokument
                </Typography>
                <UploadDocumentForm />
            </Container>
        </Container>
    );
};

const UploadPage: NextPage<{}> = (props) => {
    return (
        <DocumentUploadContainer>
            <DocumentUpload />
        </DocumentUploadContainer>
    );
};

export default UploadPage;
