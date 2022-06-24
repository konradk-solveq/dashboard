import { NextPage } from 'next';
import React, { useEffect, useContext, useState } from 'react';
import { Container, Heading } from 'theme-ui';
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
            <Container p="30px" marginX="auto" sx={{ maxWidth: '1200px', height: '80%' }}>
                <Heading as="h1" m="20px" sx={{ textAlign: 'center' }}>
                    Dodaj Dokument
                </Heading>
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
