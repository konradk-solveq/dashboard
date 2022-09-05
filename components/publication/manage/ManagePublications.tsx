import React, { useContext } from 'react';
import { Box, Typography } from '@mui/material';
import { ManagePublicationsContext } from '../../contexts/publication/ManagePublication';
import ManagePublicationsRow from './ManagePublicationRow';
import ManagePublicationsPagination from './ManagePublicationsPagination';
import BigListItem from '../../../assets/BigListItem';
import SortBar from '../../bar/SortBar';

const options = {
    type: {
        description: 'Filtr',
        options: [
            { value: '', label: 'Wszystkie' },
            { value: 'terms', label: 'Regulamin' },
            { value: 'policy', label: 'Polityka Prywatności' },
        ],
    },
    orderBy: {
        description: 'Sortuj',
        options: [
            { value: 'showDate', label: 'Data Pokazania' },
            { value: 'publicationDate', label: 'Data Publikacji' },
            { value: 'id', label: 'ID' },
            { value: 'type', label: 'Typ' },
        ],
    },
    order: {
        options: [
            { value: 'DESC', label: 'Malejąco' },
            { value: 'ASC', label: 'Rosnąco' },
        ],
    },
    limit: {
        description: 'Limit',
        options: [
            { value: 10, label: '10' },
            { value: 20, label: '20' },
            { value: 50, label: '50' },
            { value: 100, label: '100' },
        ],
    },
};

const PostPublication: React.FC = () => {
    const {
        publications: {
            data: { elements },
        },
        setParams,
        params,
    } = useContext(ManagePublicationsContext);
    return (
        <>
            <SortBar setParams={setParams} params={params} options={options} />

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
