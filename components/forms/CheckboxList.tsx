import { Box, Container, Checkbox, InputLabel } from '@mui/material/';

interface Props {
    title: string;
    listOptions: { enumValue: string; i18nValue: string }[];
    values: string[];
    setValues: (e) => void;
}

const CheckboxList: React.FC<Props> = ({ title, listOptions, values, setValues }) => {
    const handlerOnChange = (val: string) => {
        const tempValues = [...values];

        if (values.some((e) => e == val)) {
            const index = tempValues.indexOf(val);
            tempValues.splice(index, 1);
        } else {
            tempValues.push(val);
        }

        setValues(tempValues);
    };

    return (
        <Box
            sx={{
                borderTop: '1px solid #55555544',
                mt: '5px',
                py: '5px',
            }}
        >
            <Box sx={{ fontFamily: 'din-b' }}>{title}</Box>
            <Container
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    flexWrap: 'wrap',
                    width: '100%',
                    userSelect: 'none',
                }}
            >
                {listOptions.map((e) => (
                    <Container key={e.enumValue} sx={{ mr: '10px', display: 'flex' }}>
                        <InputLabel>
                            <Box>{e.i18nValue}</Box>
                            <Checkbox
                                checked={values.includes(e.enumValue)}
                                onChange={() => handlerOnChange(e.enumValue)}
                            />
                        </InputLabel>
                    </Container>
                ))}
            </Container>
        </Box>
    );
};

export default CheckboxList;
