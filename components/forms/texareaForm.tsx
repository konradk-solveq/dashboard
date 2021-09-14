import { useState, useEffect, useRef } from 'react';
import { Box, Flex, Button, Label, Textarea } from 'theme-ui';

interface Props {
    title: string;
    value: any;
    setValue: (e) => void;
    highlight?: boolean;
    freeze: boolean;
}

const TexareaForm: React.FC<Props> = ({
    title,
    value,
    setValue,
    highlight,
    freeze,
}) => {

    const [edit, setEdit] = useState(false)

    const heandleEdit = () => {
        setEdit(!edit)
    }

    useEffect(() => {
        setEdit(false)
    }, [freeze])

    const area = useRef(null);
    const [areaW, setAreaW] = useState(false)
    useEffect(() => {
        if (area.current) {
            const w = area.current.offsetWidth + 20;
            setAreaW(w);
        }
    }, [area.current]);

    return (
        <Flex sx={{
            borderTop: '1px solid #55555544',
            mt: highlight ? '10px' : '5px',
            mb: highlight ? '5px' : '0',
        }}
            ref={area}>
            <Flex sx={{
                minWidth: highlight ? areaW + 'px' : '100%',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                bg: highlight ? '#aaa' : 'transparent',
                position: 'relative',
                left: highlight ? '-10px' : '0',
                p: highlight ? '10px' : '0',
                borderRadius: '10px',
            }}>
                <Box sx={{ width: '100%' }}>
                    <Label>{title}</Label>
                    {edit && <Textarea
                        value={value ? value : ''}
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
                        {value ? value : (
                            typeof value == 'undefined' ? '-- undefined --' : (
                                value == null ? '-- null --' : '-- brak danych --'
                            ))}
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
        </Flex>
    )
}

export default TexareaForm;