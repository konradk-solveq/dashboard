import { Box, Container, Switch } from '@mui/material/';

interface Props {
    title: string;
    checked: any;
    setChecked: (e) => void;
}

const SwitchForm: React.FC<Props> = ({ title, checked, setChecked }) => {
    return (
        <Container
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                borderTop: '1px solid #55555544',
                mt: '5px',
            }}
        >
            <Box sx={{ mt: '5px', mr: '40px' }}>{title}</Box>
            <Box sx={{ mt: '5px', width: '50px' }}>
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
        </Container>
    );
};

export default SwitchForm;
