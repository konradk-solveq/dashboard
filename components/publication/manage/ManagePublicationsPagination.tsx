import React, { useContext } from 'react';
import { Button, Box, Pagination } from '@mui/material';
import { ManagePublicationsContext } from '../../contexts/publication/ManagePublication';

const ManagePublicationsPagination: React.FC<{}> = ({}) => {
    const { setParams, publications } = useContext(ManagePublicationsContext);

    return (
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', margin: '20px' }}>
            <Pagination
                onChange={(e, value) => setParams((prev) => ({ ...prev, page: value }))}
                count={Math.ceil(publications.data.total / publications.data.limit)}
                showFirstButton
                showLastButton
            />
        </Box>
    );
};

export default ManagePublicationsPagination;
