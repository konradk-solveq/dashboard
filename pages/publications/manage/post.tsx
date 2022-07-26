import { NextPage } from 'next';
import React from 'react';
import { Container } from '@mui/material';

import PostPublicationContainer from '../../../components/contexts/publication/PostPublication';
import PostPublicationForm from '../../../components/publication/manage/PostPublicationForm';

const PostPublications: React.FC = () => {
    return (
        <Container sx={{ maxWidth: '1200px', height: '100%', p: '30px' }}>
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
