import { Box, Flex, Checkbox, Label } from 'theme-ui';

interface Props {
    title: string;
    listOptions: any;
    values: any;
    setValues: (e) => void;
}

const CheckboxList: React.FC<Props> = ({
    title,
    listOptions,
    values,
    setValues
}) => {

    const heandlerOnChange = (val: string) => {
        const tempValues = [...values];

        if (values.some(e => e == val)) {
            const index = tempValues.indexOf(val);
            tempValues.splice(index, 1);
        } else {
            tempValues.push(val);
        }

        setValues(tempValues);
    }

    return (
        <Box sx={{
            borderTop: '1px solid #55555544',
            mt: '5px',
            py: '5px',
        }}>
            <Box sx={{fontFamily: 'din-b'}}>{title}</Box>
            <Flex sx={{
                justifyContent: 'flex-start',
                flexWrap: 'wrap',
                width: '100%',
                userSelect: 'none'
            }}>
                {
                    listOptions.map((e, i) => (
                        <Flex
                            key={e.enumValue + '_' + i}
                            sx={{ mr: '10px' }}
                        >
                            <Label>
                                <Box>{e.i18nValue}</Box>
                                <Checkbox
                                    defaultChecked={values.some(g => g == e.enumValue)}
                                    onClick={() => heandlerOnChange(e.enumValue)}
                                />
                            </Label>
                        </Flex>
                    ))
                }
            </Flex >
        </Box>
    )
}

export default CheckboxList;