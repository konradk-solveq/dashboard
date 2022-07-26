import { format, parseJSON } from 'date-fns';
import React, { useState } from 'react';
import { Button, Checkbox, Flex, Grid, Spinner, Text } from 'theme-ui';
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
        <Grid
            sx={{
                alignItems: 'center',
                justifyItems: 'center',
                fontSize: '1.2rem',
                textAlign: 'center',
                margin: '40px 0 0',
                height: '45px',
            }}
            gap={2}
            columns="1fr 1fr 1fr 1fr 1fr 60px 0.5fr 0.5fr"
        >
            <Text>{item.type === 'policy' ? 'Polityka Prywatności' : 'Regulamin'}</Text>
            <Text>{item.pair.oldDocument.name}</Text>
            <Text>{item.pair.newDocument.name}</Text>
            <Text>{format(parseJSON(item.showDate), 'dd-MM-yyyy HH:mm')}</Text>
            <Text>{format(parseJSON(item.publicationDate), 'dd-MM-yyyy HH:mm')}</Text>
            <Checkbox sx={{ margin: '0' }} checked={item.draft} readOnly />
            <Button
                sx={{ width: '100%', height: '40px', padding: 0, fontSize: '1rem' }}
                bg="grey"
                onClick={() => setEditMode((prev) => !prev)}
                type="button"
            >
                Edytuj
            </Button>
            <Button
                sx={{ width: '100%', height: '40px', padding: 0, fontSize: '1rem' }}
                onClick={() => setDeleteModalState((prev) => !prev)}
            >
                Usuń
            </Button>
            {deleteModalState && <DeleteModal item={item} setDeleteModalState={setDeleteModalState} />}
        </Grid>
    );
};

export default ManagePublicationsRow;
