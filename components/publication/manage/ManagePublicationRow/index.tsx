import { format, parseJSON } from 'date-fns';
import React, { useState } from 'react';
import { Button, Checkbox, Box, CircularProgress, Typography } from '@mui/material';
import { ManagePublicationsRowProps } from '../../../typings/ManagePublications';
import DeleteModal from './DeleteModal';
import EditRow from './EditRow';

const ManagePublicationsRow: React.FC<ManagePublicationsRowProps> = ({ item }) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [deleteModalState, setDeleteModalState] = useState<boolean>(false);

    if (editMode) {
        return <EditRow item={item} setEditMode={setEditMode} setIsLoading={setIsLoading} />;
    }

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center', marginTop: '40px' }}>
                <CircularProgress sx={{ m: 40 }} />
            </Box>
        );
    }

    return (
        <Box
            sx={{
                alignItems: 'center',
                justifyItems: 'center',
                fontSize: '1.2rem',
                textAlign: 'center',
                margin: '40px 0 0',
                height: '45px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 60px 1fr',
                gap: 2,
            }}
        >
            <Typography variant="h6" sx={{ fontWeight: 200 }}>
                {item.type === 'policy' ? 'Polityka Prywatności' : 'Regulamin'}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 200 }}>
                {item.pair.oldDocument.name}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 200 }}>
                {item.pair.newDocument.name}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 200 }}>
                {format(parseJSON(item.showDate), 'dd-MM-yyyy HH:mm')}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 200 }}>
                {format(parseJSON(item.publicationDate), 'dd-MM-yyyy HH:mm')}
            </Typography>
            <Checkbox sx={{ margin: '0' }} checked={item.draft} readOnly />
            <Button
                sx={{ width: '100%', height: '40px', padding: 0, fontSize: '1rem' }}
                variant="contained"
                onClick={() => setEditMode((prev) => !prev)}
                type="button"
            >
                Edytuj
            </Button>
            <Button
                sx={{ width: '100%', height: '40px', padding: 0, fontSize: '1rem' }}
                onClick={() => setDeleteModalState((prev) => !prev)}
                variant="contained"
                color="error"
            >
                Usuń
            </Button>
            {deleteModalState && <DeleteModal item={item} setDeleteModalState={setDeleteModalState} />}
        </Box>
    );
};

export default ManagePublicationsRow;
