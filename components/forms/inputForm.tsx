import { useState } from 'react';
import { Box, Flex, Button, Label, Input } from 'theme-ui';

interface Props {
    title: string;
    value: any;
    setValue: (e) => void;
}

const InputForm: React.FC<Props> = ({
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
        }}>
            <Box>
                <Label sx={{ mt: '5px' }}>{title}</Label>
                {edit && <Input
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    sx={{
                        bg: '#fff',
                        p: '2px',
                        fontFamily: 'din-b',
                        width: '250px'
                    }} />}

                {!edit && <Box
                    sx={{
                        fontFamily: 'din-b',
                        p: '3px',
                        width: '250px'
                    }}>
                    {value}
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
                    bg: edit ? '#888' : 'primary'
                }}
                onClick={heandleEdit}
            >edytuj</Button>
        </Flex>
    )
}

export default InputForm;