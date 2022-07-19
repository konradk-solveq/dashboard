import { NextPage } from 'next';
import React from 'react';
import { Container } from 'theme-ui';

import PostPublicationContainer from '../../../components/contexts/publication/PostPublication';
import PostPublicationForm from '../../../components/publication/manage/PostPublicationForm';

const PostPublications: React.FC = () => {
    return (
        <Container p="30px" marginX="auto" sx={{ maxWidth: '1200px', height: '100%' }}>
            <PostPublicationForm />
        </Container>
    );
};

const PostPublicationsPage: NextPage<{}> = (props) => {
    return (
        <PostPublicationContainer>
            <PostPublications />
        </PostPublicationContainer>
    );
};

export default PostPublicationsPage;
