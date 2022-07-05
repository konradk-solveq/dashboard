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
        <Container
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                borderTop: '1px solid #55555544',
                mt: '5px',
            }}
        >
            <Box sx={{ width: '100%' }}>
                <InputLabel>{title}</InputLabel>
                {edit && (
                    <Input
                        value={value ? value : ''}
                        onChange={(e) => setValue(e.target.value)}
                        sx={{
                            bg: '#fff',
                            p: '2px',
                            fontFamily: 'din-b',
                            minWidth: '250px',
                            width: '100%',
                        }}
                    />
                )}

                {!edit && (
                    <Box
                        sx={{
                            fontFamily: 'din-b',
                            p: '3px',
                            minWidth: '250px',
                            minHeight: '30px',
                            color: value ? '' : 'primary',
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
            <Button
                className="sys-btn"
                type="button"
                sx={{
                    py: '3px',
                    px: '10px',
                    height: '28px',
                    ml: '20px',
                    bg: edit ? '#888' : 'primary',
                    minWidth: '62px',
                }}
                onClick={handleEdit}
            >
                edytuj
            </Button>
        </Container>
    );
};

export default InputForm;
