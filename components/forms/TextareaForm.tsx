import { useState, useEffect, useRef } from 'react';
import { Box, Container, Button, InputLabel, TextareaAutosize } from '@mui/material/';

interface Props {
    title: string;
    value: any;
    setValue: (e) => void;
    highlight?: boolean;
    freeze: boolean;
}

const TextareaForm: React.FC<Props> = ({ title, value, setValue, highlight, freeze }) => {
    const [edit, setEdit] = useState(false);

    const handleEdit = () => {
        setEdit(!edit);
    };

    useEffect(() => {
        setEdit(false);
    }, [freeze]);

    const area = useRef(null);
    const [areaW, setAreaW] = useState(false);
    useEffect(() => {
        if (area.current) {
            const w = area.current.offsetWidth + 20;
            setAreaW(w);
        }
    }, [area.current]);

    return (
        <Container
            sx={{
                display: 'flex',
                borderTop: '1px solid #55555544',
                mt: highlight ? '10px' : '5px',
                mb: highlight ? '5px' : '0',
            }}
            ref={area}
        >
            <Box sx={{ display: 'flex', mt: '16px', mb: '16px', width: '100%' }}>
                <Box sx={{ width: '100%' }}>
                    <InputLabel sx={{ color: 'black', fontWeight: 400, fontSize: '24px' }}>{title}</InputLabel>
                    {edit && (
                        <TextareaAutosize
                            value={value ? value : ''}
                            onChange={(e) => setValue(e.target.value)}
                            style={{
                                backgroundColor: '#fff',
                                padding: '2px',
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
                    <Button variant="contained" type="button" onClick={handleEdit}>
                        Edytuj
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default TextareaForm;
