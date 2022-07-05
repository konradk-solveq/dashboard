import { Box, Container } from '@mui/material/';
import AnimKross from '../assets/krossLogoAnim';

const Home: React.FC<{}> = ({}) => {
    return (
        <Container
            sx={{
                display: 'flex',
                width: '100%',
                minHeight: 200,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Box
                sx={{
                    width: 370,
                }}
            >
                <Box sx={{ width: '242', height: '130' }}>
                    <AnimKross />
                </Box>
            </Box>
        </Container>
    );
};

export default Home;
