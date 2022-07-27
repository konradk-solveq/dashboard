import React, { useContext } from 'react';
import { Button, Box } from '@mui/material';
import { ManagePublicationsContext } from '../../contexts/publication/ManagePublication';

const ManagePublicationsPagination: React.FC<{}> = ({}) => {
    const { params, setParams, publications } = useContext(ManagePublicationsContext);

    const handlePrevPage = () => setParams((prev) => ({ ...prev, page: prev.page - 1 }));
    const handleNextPage = () => setParams((prev) => ({ ...prev, page: prev.page + 1 }));

    return (
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', margin: '20px' }}>
            {params.page > 0 && publications.data.links.prev && (
                <Button variant="contained" sx={{ mr: '20px' }} onClick={handlePrevPage}>
                    Poprzednia
                </Button>
            )}
            {!publications.isPreviousData && publications.data.links.next && (
                <Button variant="contained" onClick={handleNextPage}>
                    Następna
                </Button>
            )}
        </Box>
    );
};

export default ManagePublicationsPagination;
