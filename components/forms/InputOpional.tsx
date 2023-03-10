import { useState } from 'react';
import { Box, Container, Button, Input } from '@mui/material/';

interface Props {
    value: any;
    setValue: (e) => void;
}

const InputOptional: React.FC<Props> = ({ value, setValue }) => {
    const [edit, setEdit] = useState(false);

    const handleEdit = () => {
        setEdit(!edit);
    };

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
                {edit && (
                    <Input
                        value={value}
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
                dodaj
            </Button>
        </Container>
    );
};

export default InputOptional;
