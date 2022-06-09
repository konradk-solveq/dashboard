import { NextPage } from 'next';
import React, { useEffect, useContext } from 'react';
import { Container, Heading } from 'theme-ui';
import DocumentUploadContainer, {
    DocumentUploadContext,
} from '../../../components/contexts/publication/DocumentUpload';

import UploadDocumentForm from '../../../components/publication/manage/UploadDocumentForm';
import { AvailableLanguages } from '../../../components/typings/PublicationSection';

const DocumentUpload: React.FC = () => {
    const { getAvailableLanguages, setAvailableLanguages } = useContext(DocumentUploadContext);

    useEffect(() => {
        getAvailableLanguages(setAvailableLanguages);
    }, []);

    return (
        <Container>
            <Container p="30px" marginX="auto" sx={{ maxWidth: '1200px' }}>
                <Heading as="h1" m="20px" sx={{ textAlign: 'center' }}>
                    Dodaj Dokument
                </Heading>
                <UploadDocumentForm />
            </Container>
        </Container>
    );
};

const PublicationPage: NextPage<{}> = (props) => {
    return (
        <DocumentUploadContainer>
            <DocumentUpload />
        </DocumentUploadContainer>
    );
};

export default PublicationPage;
