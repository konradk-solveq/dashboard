import { NextPage } from 'next';
import React, { useContext, useEffect, useState } from 'react';
import ManagePublicationsContainer, {
    ManagePublicationsContext,
} from '../../../components/contexts/publication/ManagePublication';
import ManagePublications from '../../../components/publication/manage/ManagePublications';
import { Container } from '@mui/material/';

const Manage: React.FC = () => {
    const { getPublications, fetchApis } = useContext(ManagePublicationsContext);

    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            await getPublications();
            await fetchApis();
            setIsLoading(false);
        };
        fetchData();
    }, []);

    if (isLoading) {
        return (
            <Flex sx={{ width: '100%', height: '60%', justifyContent: 'center', alignItems: 'center' }}>
                <Spinner />
            </Flex>
        );
    }

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
        <ManagePublicationsContainer>
            <Manage />
        </ManagePublicationsContainer>
    );
};

export default PublicationsPage;
