import { NextPage } from 'next';
import React, { useContext, useEffect, useState } from 'react';
import { Container, Flex, Spinner } from 'theme-ui';
import ManagePublicationsContainer, {
    ManagePublicationsContext,
} from '../../../components/contexts/publication/ManagePublication';
import ManagePublications from '../../../components/publication/manage/ManagePublications';

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
        <Container p="30px" marginX="auto" sx={{ maxWidth: '1200px', height: '100%' }}>
            <ManagePublications />
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
