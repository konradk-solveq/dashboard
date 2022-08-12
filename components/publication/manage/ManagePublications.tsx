import React, { useContext } from 'react';
import { Box, Typography } from '@mui/material';
import { ManagePublicationsContext } from '../../contexts/publication/ManagePublication';
import ManagePublicationsRow from './ManagePublicationRow';
import Sort from './Sort';
import ManagePublicationsPagination from './ManagePublicationsPagination';
import BigListItem from '../../../assets/BigListItem';

const PostPublication = () => {
    const {
        publications: {
            data: { elements },
        },
    } = useContext(ManagePublicationsContext);
    return (
        <>
            <Box
                sx={{
                    alignItems: 'center',
                    justifyItems: 'center',
                    textAlign: 'center',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 80px 40px 176px',
                    gap: 2,
                    margin: '16px',
                    padding: '8px 16px',
                }}
            >
                <Typography variant="h5">Typ Publikacji</Typography>
                <Typography variant="h5">Aktualny dokument</Typography>
                <Typography variant="h5">Nowy dokument</Typography>
                <Typography variant="h5">Data pokazania</Typography>
                <Typography variant="h5">Data wygaśniecia starego dokumentu</Typography>
                <Typography variant="h5">Domyślny Język</Typography>
                <Typography variant="h5">Draft</Typography>
                <Sort />
            </Box>
            {elements?.map((item) => (
                <BigListItem key={item.id}>
                    <ManagePublicationsRow key={item.id} item={item} />
                </BigListItem>
            ))}

            <ManagePublicationsPagination />
        </>
    );
};

export default PostPublication;
