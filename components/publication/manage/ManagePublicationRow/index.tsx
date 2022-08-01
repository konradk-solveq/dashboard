import { format, parseJSON } from 'date-fns';
import React, { useState } from 'react';
import { Button, Checkbox, Box, CircularProgress, Typography } from '@mui/material';
import { ManagePublicationsRowProps } from '../../../typings/ManagePublications';
import DeleteModal from './DeleteModal';
import EditRow from './EditRow';

const ManagePublicationsRow: React.FC<ManagePublicationsRowProps> = ({ item }) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [deleteModalState, setDeleteModalState] = useState<boolean>(false);

    if (editMode) {
        return <EditRow item={item} setEditMode={setEditMode} />;
    }

    return (
        <Box
            sx={{
                alignItems: 'center',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 0.1fr 1fr',
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
            <Box sx={{ display: 'flex' }}>
                <Button variant="contained" onClick={() => setEditMode((prev) => !prev)} type="button">
                    Edytuj
                </Button>
                <Button
                    onClick={() => setDeleteModalState((prev) => !prev)}
                    variant="contained"
                    color="error"
                    sx={{ ml: '16px' }}
                >
                    Usuń
                </Button>
            </Box>
            {deleteModalState && <DeleteModal item={item} setDeleteModalState={setDeleteModalState} />}
        </Box>
    );
};

export default ManagePublicationsRow;
