import { NextPage } from 'next';
import React, { useContext } from 'react';
import ManagePublicationsContainer, {
    ManagePublicationsContext,
} from '../../../components/contexts/publication/ManagePublication';
import ManagePublications from '../../../components/publication/manage/ManagePublications';
import { Box, CircularProgress, Container } from '@mui/material/';

const Manage: React.FC = () => {
    const { publications } = useContext(ManagePublicationsContext);

    if (publications.isLoading) {
        return (
            <Box sx={{ display: 'flex', width: '100%', height: '60%', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth={false}>
            <Container
                maxWidth={false}
                sx={{
                    minWidth: '950px',
                    maxWidth: '1400px',
                    p: '30px',
                    textAlign: 'center',
                }}
            >
                <ManagePublications />
            </Container>
        </Container>
    );
};

const PublicationsPage: NextPage<{}> = (props) => {
    return (
        <ManagePublicationsContainer>
            <Manage />
        </ManagePublicationsContainer>
    );
};

export default PublicationsPage;
