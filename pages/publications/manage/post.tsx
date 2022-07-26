import { Container } from '@mui/material';
import { NextPage } from 'next';
import React from 'react';

import PostPublicationContainer from '../../../components/contexts/publication/PostPublication';
import PostPublicationForm from '../../../components/publication/manage/PostPublicationForm';

const PostPublications: React.FC = () => {
    return (
        <Container sx={{ p: '30px', display: 'flex', justifyContent: 'center' }}>
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
