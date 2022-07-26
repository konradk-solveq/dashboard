import React, { useContext } from 'react';
import { Box, Typography } from '@mui/material';
import { ManagePublicationsContext } from '../../contexts/publication/ManagePublication';
import ManagePublicationsRow from './ManagePublicationRow';
import Sort from './Sort';
import ManagePublicationsPagination from './ManagePublicationsPagination';

const PostPublication: React.FC = () => {
    const { publications } = useContext(ManagePublicationsContext);

    return (
        <>
            <Box
                sx={{
                    alignItems: 'center',
                    justifyItems: 'center',
                    textAlign: 'center',
                    marginBottom: '40px',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 60px 1fr',
                    gap: 2,
                }}
            >
                <Typography variant="h5">Typ Publikacji</Typography>
                <Typography variant="h5">Aktualny dokument</Typography>
                <Typography variant="h5">Nowy dokument</Typography>
                <Typography variant="h5">Data pokazania</Typography>
                <Typography variant="h5">Data wygaśniecia starego dokumentu</Typography>
                <Typography variant="h5">Draft</Typography>

                <Sort />
            </Box>
            {publications?.map((item) => (
                <ManagePublicationsRow key={item.id} item={item} />
            ))}
            <ManagePublicationsPagination />
        </>
    );
};

export default PostPublication;
