// import { useBreakpointIndex, useResponsiveValue } from '@@mui/material//match-media';
import Routing from 'next/link';
import React, { useState } from 'react';
import Link from '@mui/material/Link';
import { List, Box, Container, Divider, IconButton, Drawer, Typography, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import useToggle from './hooks/useToggle';

const Item: React.FC<{ target: string; text: string }> = ({ target, text }) => {
    return (
        <Container
            sx={{
                color: '#eee',
            }}
        >
            <Routing passHref href={target}>
                <Link>
                    <MenuItem sx={{ fontSize: 17, fontWeight: 300 }}>{text}</MenuItem>
                </Link>
            </Routing>
        </Container>
    );
};

const MenuDrawer: React.FC<{}> = ({ children }) => {
    const [open, setOpen] = useState(false);
    const content = () => {
        return (
            <Box
                sx={{
                    bg: '#555',
                    userSelect: 'none',
                    mt: '86px',
                }}
            >
                <Divider textAlign="left" sx={{ fontSize: 18 }}>
                    Trasy
                </Divider>
                <List>
                    <Item text="Lista Tras" target="/routes/list" />
                    <Item text="Wyróżnione Trasy" target="/routes/featured" />
                    <Item text="Statystyki Tras" target="/routes/statistics" />
                    <Item text="Raporty" target="/routes/reports" />
                </List>
                <Divider textAlign="left" sx={{ fontSize: 18 }}>
                    Publikacje
                </Divider>
                <List title="Publikacje">
                    <Item text="Publikuj" target="/publications/manage/post" />
                    <Item text="Zarządzaj Publikacjami" target="/publications/manage" />
                    <Item text="Wgraj Dokumenty" target="/publications/manage/documents" />
                </List>
                <Divider textAlign="left" sx={{ fontSize: 18 }}>
                    Ustawienia
                </Divider>
                <List>
                    <Item text="Powiadomienia" target="/settings/notifications" />
                    <Item text="Tłumaczenia" target="/settings/translation" />
                    <Item text="Wersja Aplikacji" target="/settings/version" />
                    <Item text="Wersja Aplikacji - (v.2)" target="/settings/appVersionToPlatform" />
                    <Item text="Webhook" target="/webhook" />
                </List>
            </Box>
        );
    };
    return (
        <div>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                title="Menu"
                aria-label="menu"
                sx={{ ml: 'auto', mr: '2', transition: '1s' }}
                onClick={() => {
                    setOpen(!open);
                }}
            >
                {open ? (
                    <CloseIcon htmlColor="#ffffff" sx={{ transform: 'rotate(90deg)' }} />
                ) : (
                    <MenuIcon htmlColor="#ffffff" />
                )}
            </IconButton>
            <Drawer
                anchor="left"
                variant="temporary"
                sx={{ width: '200px' }}
                elevation={3}
                open={open}
                onClose={() => setOpen(false)}
            >
                <div>{content()}</div>
            </Drawer>
        </div>
    );
};
export default MenuDrawer;
