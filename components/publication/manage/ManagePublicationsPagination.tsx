import React, { useContext } from 'react';
import { Button, Flex } from 'theme-ui';
import { ManagePublicationsContext } from '../../contexts/publication/ManagePublication';

const ManagePublicationsPagination: React.FC<{}> = ({}) => {
    const { getPublications, prevPageURL, nextPageURL } = useContext(ManagePublicationsContext);

    const handlePrevPage = () => getPublications(prevPageURL);
    const handleNextPage = () => getPublications(nextPageURL);

    return (
        <Flex sx={{ width: '100%', justifyContent: 'center', margin: '20px' }}>
            {prevPageURL && (
                <Button bg="grey" mr="20px" sx={{ cursor: 'pointer' }} onClick={handlePrevPage}>
                    Poprzednia
                </Button>
            )}
            {nextPageURL && (
                <Button sx={{ cursor: 'pointer' }} onClick={handleNextPage}>
                    Następna
                </Button>
            )}
        </Flex>
    );
};

export default ManagePublicationsPagination;
