// import { useBreakpointIndex } from '@@mui/material//match-media';
import { signOut, useSession } from 'next-auth/client';
import Routing from 'next/link';
import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Logo from '../assets/myKrossLogo';
import SmallLogo from '../assets/smallLogo';

const Header: React.FC<{}> = ({ children }) => {
    const [session, loading] = useSession();
    const index = 1;
    //useBreakpointIndex();

    const icon = (i) => {
        if (i < 2) {
            return (
                <Box
                    className="logo"
                    sx={{
                        pl: 10,
                        width: [70, 70, null, null, null],
                        minHeight: 48,
                    }}
                >
                    <Box
                        sx={{
                            heigth: 100,
                            width: 100,
                        }}
                    >
                        <SmallLogo />
                    </Box>
                </Box>
            );
        } else {
            return (
                <Box
                    className="logo"
                    sx={{
                        pl: 20,
                        width: 300,
                        minHeight: 48,
                    }}
                >
                    <Box
                        sx={{
                            heigth: 748.9161 / 128.6318,
                            width: 748.9161 / 128.6318,
                        }}
                    >
                        <Logo />
                    </Box>
                </Box>
            );
        }
    };

    return (
        <Container sx={{ display: 'flex', minHeight: 48, flexDirection: 'column', justifyContent: 'space-between' }}>
            <Container
                sx={{
                    // bg: '#f8f8f8',
                    padding: 2,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid #ddd',
                }}
            >
                <Routing passHref href="/">
                    {icon(index)}
                </Routing>
                <Container
                    sx={{
                        justifyContent: 'end',
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                    }}
                >
                    {session && (
                        <>
                            <Container sx={{ position: 'relative', right: '0' }}>{session.user.email}</Container>
                            <Button sx={{ width: '100px', mt: '10px' }} onClick={() => signOut()}>
                                Wyloguj
                            </Button>
                        </>
                    )}
                </Container>
            </Container>
        </Container>
    );
};
export default Header;
