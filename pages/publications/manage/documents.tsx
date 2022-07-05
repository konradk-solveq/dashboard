import { NextPage } from 'next';
import React, { useEffect, useContext, useState } from 'react';
import { Container, Typography } from '@mui/material/';
import DocumentUploadContainer, {
    DocumentUploadContext,
} from '../../../components/contexts/publication/DocumentUpload';

import UploadDocumentForm from '../../../components/publication/manage/UploadDocumentForm';

const DocumentUpload: React.FC = () => {
    const { getAvailableLanguages, setAvailableLanguages } = useContext(DocumentUploadContext);
    const [loadingError, setLoadingError] = useState<Boolean>(false);

    useEffect(() => {
        try {
            getAvailableLanguages(setAvailableLanguages);
        } catch {
            setLoadingError(true);
        }
    }, []);

    return (
        <Container>
            <Container sx={{ maxWidth: '1200px', height: '80%', p: '30px', marginX: 'auto' }}>
                <Typography variant="h1" sx={{ textAlign: 'center', m: '20px' }}>
                    Dodaj Dokument
                </Typography>
                <UploadDocumentForm loadingError={loadingError} />
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
