// import { useBreakpointIndex } from '@@mui/material//match-media';
import { signOut, useSession } from 'next-auth/client';
import Routing from 'next/link';
import React from 'react';
import { Box, Container, Button, AppBar, Toolbar, IconButton, Typography } from '@mui/material';

import Menu from './Menu';
import Logo from '../assets/myKrossLogo';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header: React.FC<{}> = ({ children }) => {
    const [session, loading] = useSession();
    const index = 3;
    //useBreakpointIndex();

    return (
        <Box sx={{ flexGrow: 1, width: '100vw', display: 'flex', justifyContent: 'center' }}>
            <AppBar position="static" color="primary" style={{ zIndex: 1301 }}>
                <Toolbar>
                    <Menu />
                    <Routing passHref href="/">
                        <Box
                            sx={{
                                heigth: '25%', //748.9161 / 128.6318
                                width: '25%',
                                maxWidth: '300px',
                                fill: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Logo />
                        </Box>
                    </Routing>
                    {session && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', ml: 'auto' }}>
                            <AccountCircleIcon htmlColor="#ffffff" />

                            <Typography variant="h6" sx={{ color: '#ffffff', mr: '16px', ml: '8px' }}>
                                {session.user.email}
                            </Typography>
                            <IconButton onClick={() => signOut()}>
                                <LogoutIcon htmlColor="#ffffff" />
                            </IconButton>
                        </Box>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
};
export default Header;
