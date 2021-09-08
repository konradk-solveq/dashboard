import { useState } from 'react';
import { Box, Flex, Button, Label, Textarea } from 'theme-ui';

interface Props {
    title: string;
    value: any;
    setValue: (e) => void;
}

const TexareaForm: React.FC<Props> = ({
    title,
    value,
    setValue,
}) => {


    const [edit, setEdit] = useState(false)

    const heandleEdit = () => {
        setEdit(!edit)
    }

    return (
        <Flex sx={{
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            borderTop: '1px solid #55555544',
            mt: '5px'
        }}>
            <Box sx={{ width: '100%' }}>
                <Label>{title}</Label>
                {edit && <Textarea
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    sx={{
                        bg: '#fff',
                        p: '2px',
                        fontFamily: 'din-b',
                        minWidth: '250px',
                        width: '100%',
                    }} />}

                {!edit && <Box
                    sx={{
                        fontFamily: 'din-b',
                        p: '3px',
                        minWidth: '250px',
                        minHeight: '30px',
                        color: value ? '' : 'primary',
                    }}>
                    {value ? value : '-- brak danych --'}
                </Box>}
            </Box>
            <Button
                className='sys-btn'
                type='button'
                sx={{
                    py: '3px',
                    px: '10px',
                    height: '28px',
                    ml: '20px',
                    bg: edit ? '#888' : 'primary',
                    minWidth: '62px',
                }}
                onClick={heandleEdit}
            >edytuj</Button>
        </Flex>
    )
}

export default TexareaForm;