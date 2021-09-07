import { Box, Flex, Switch } from 'theme-ui';

interface Props {
    title: string;
    checked: any;
    setChecked: (e) => void;
}

const SwitchForm: React.FC<Props> = ({
    title,
    checked,
    setChecked,
}) => {

    return (
        <Flex sx={{ justifyContent: 'space-between', width: '100%', mt: '5px' }}>
        <Box sx={{ mr: '40px' }}>{title}</Box>
        <Box
            sx={{ m: 0, p: 0, width: '50px' }}
        >
            <Switch
                checked={checked}
                onChange={() => setChecked(!checked)}
                sx={{
                    bg: 'gray',
                    // '&:checked': {
                    //     bf: 'primary'
                    // },
                    'input:checked ~ &': {
                        bg: 'primary',
                    },
                }}
            />
        </Box>
    </Flex>
    )
}

export default SwitchForm;