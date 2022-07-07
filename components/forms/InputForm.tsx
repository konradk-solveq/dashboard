import { useEffect, useState } from 'react';
import { Box, Container, Button, InputLabel, Input } from '@mui/material/';

interface Props {
    title: string;
    value: any;
    setValue: (e) => void;
    freeze: boolean;
}

const InputForm: React.FC<Props> = ({ title, value, setValue, freeze }) => {
    const [edit, setEdit] = useState(false);

    const handleEdit = () => {
        setEdit(!edit);
    };

    useEffect(() => {
        setEdit(false);
    }, [freeze]);

    return (
        <Container sx={{ display: 'flex' }}>
            <Box sx={{ width: '100%' }}>
                <InputLabel sx={{ color: 'black', fontWeight: 400, fontSize: '24px' }}>{title}</InputLabel>
                {edit && (
                    <Input
                        value={value ? value : ''}
                        onChange={(e) => setValue(e.target.value)}
                        sx={{
                            bg: '#fff',
                            p: '2px',
                            minWidth: '250px',
                            width: '100%',
                        }}
                    />
                )}

                {!edit && (
                    <Box
                        sx={{
                            p: '3px',
                            minWidth: '250px',
                            minHeight: '30px',
                            color: value ? '' : 'primary',
                            fontWeight: 200,
                            fontSize: '24px',
                        }}
                    >
                        {value
                            ? value
                            : typeof value == 'undefined'
                            ? '-- undefined --'
                            : value == null
                            ? '-- null --'
                            : '-- brak danych --'}
                    </Box>
                )}
            </Box>
            <Box>
                <Button type="button" variant="contained" onClick={handleEdit}>
                    Edytuj
                </Button>
            </Box>
        </Container>
    );
};

export default InputForm;
