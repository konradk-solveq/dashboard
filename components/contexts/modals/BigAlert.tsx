import { useEffect, useState } from 'react';
import { Box, Container } from '@mui/material';

interface Props {
    text: string;
    show: boolean;
}

const BigAlert: React.FC<Props> = ({ text, show }: Props) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);

        const timeout = setTimeout(() => {
            setVisible(false);
        }, 1000);
    }, [show]);

    if (!visible) {
        return null;
    }

    return (
        <Container
            sx={{
                display: 'flex',
                position: 'fixed',
                left: 0,
                top: 0,
                width: '100%',
                height: '100vh',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Box
                sx={{
                    p: '15px 70px',
                    bg: 'primary',
                    borderRadius: '20px',
                    color: '#fff',
                    border: '2px solid #313131',
                    boxShadow: '0px 0px 180px 140px rgba(255,255,255,.6);',
                }}
            >
                <h1>{text}</h1>
            </Box>
        </Container>
    );
};

export default BigAlert;
