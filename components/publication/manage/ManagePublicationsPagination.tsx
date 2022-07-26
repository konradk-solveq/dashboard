import React, { useContext } from 'react';
import { Button, Box } from '@mui/material';
import { ManagePublicationsContext } from '../../contexts/publication/ManagePublication';

const ManagePublicationsPagination: React.FC<{}> = ({}) => {
    const { getPublications, prevPageURL, nextPageURL } = useContext(ManagePublicationsContext);

    const handlePrevPage = () => getPublications(prevPageURL);
    const handleNextPage = () => getPublications(nextPageURL);

    return (
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', margin: '20px' }}>
            {prevPageURL && (
                <Button variant="contained" sx={{ mr: '20px' }} onClick={handlePrevPage}>
                    Poprzednia
                </Button>
            )}
            {nextPageURL && (
                <Button variant="contained" onClick={handleNextPage}>
                    Następna
                </Button>
            )}
        </Box>
    );
};

export default ManagePublicationsPagination;
