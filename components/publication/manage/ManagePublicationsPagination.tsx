import React, { useContext } from 'react';
import { Button, Flex } from 'theme-ui';
import { ManagePublicationsContext } from '../../contexts/publication/ManagePublication';

const ManagePublicationsPagination: React.FC<{}> = ({}) => {
    const { params, setParams, publications } = useContext(ManagePublicationsContext);

    const handlePrevPage = () => setParams((prev) => ({ ...prev, page: prev.page - 1 }));
    const handleNextPage = () => setParams((prev) => ({ ...prev, page: prev.page + 1 }));

    return (
        <Flex sx={{ width: '100%', justifyContent: 'center', margin: '20px' }}>
            {params.page > 0 && publications.data.links.prev && (
                <Button bg="grey" mr="20px" sx={{ cursor: 'pointer' }} onClick={handlePrevPage}>
                    Poprzednia
                </Button>
            )}
            {!publications.isPreviousData && publications.data.links.next && (
                <Button sx={{ cursor: 'pointer' }} onClick={handleNextPage}>
                    Następna
                </Button>
            )}
        </Flex>
    );
};

export default ManagePublicationsPagination;
