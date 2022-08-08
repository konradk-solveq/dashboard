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
                gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 80px 40px 176px',
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
            <Typography variant="h6" sx={{ fontWeight: 200 }}>
                {item.fallbackLanguage.toUpperCase()}
            </Typography>
            <Checkbox sx={{ margin: '0' }} checked={item.draft} disabled />
            <Box sx={{ display: 'flex' }}>
                <Button
                    variant="contained"
                    onClick={() => setEditMode((prev) => !prev)}
                    sx={{ width: '80px' }}
                    type="button"
                >
                    Edytuj
                </Button>
                <Button
                    onClick={() => setDeleteModalState((prev) => !prev)}
                    variant="contained"
                    color="error"
                    sx={{ ml: '16px', width: '80px' }}
                >
                    Usuń
                </Button>
            </Box>
            {deleteModalState && <DeleteModal item={item} setDeleteModalState={setDeleteModalState} />}
        </Box>
    );
};

export default ManagePublicationsRow;
