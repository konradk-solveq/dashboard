import React from 'react';
import { Typography, Button, Alert, Box } from '@mui/material/';

type IProps = {
    confirmDelete: () => void;
    changeDeleteModalState: () => void;
};

const ConfirmDeleteModal: React.FC<IProps> = ({ confirmDelete, changeDeleteModalState }) => {
    return (
        <Alert
            severity="error"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            action={
                <Box>
                    <Button
                        variant="contained"
                        color="error"
                        sx={{ width: '120px', ml: 'auto', mr: '30px' }}
                        onClick={confirmDelete}
                    >
                        Tak
                    </Button>
                    <Button
                        variant="contained"
                        color="success"
                        sx={{ width: '120px' }}
                        onClick={changeDeleteModalState}
                    >
                        Nie
                    </Button>
                </Box>
            }
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Typography variant="h5" style={{ fontWeight: 300 }}>
                    Czy na pewno chcesz usunąć grupę powiadomień?
                </Typography>
            </Box>
        </Alert>
    );
};

export default ConfirmDeleteModal;
