import { useBreakpointIndex, useResponsiveValue } from '@theme-ui/match-media';
import Routing from 'next/link';
import { useState } from 'react';
import { Box, Button, Container, Link, Text } from 'theme-ui';
import useToggle from './hooks/useToggle';

const Item: React.FC<{ target: string; text: string }> = ({ target, text }) => {
    return (
        <Container
            sx={{
                pl: 10,
                fontSize: '18px',
                color: '#eee',
            }}
        >
            <Routing passHref href={target}>
                <Link>{text}</Link>
            </Routing>
        </Container>
    );
};

const Splitter: React.FC<{}> = () => {
    return (
        <Box
            sx={{
                width: '100%',
                height: '1px',
                my: '5px',
                bg: '#777',
                position: 'relative',
            }}
        ></Box>
    );
};

const List: React.FC<{ title: string }> = ({ title, children }) => {
    const [isShown, toggle] = useToggle(true);

    return (
        <>
            <Box sx={{ width: '100%' }} onClick={toggle}>
                <Text
                    sx={{
                        fontSize: '25px',
                        color: '#eee',
                    }}
                >
                    {title}
                </Text>
            </Box>
            {isShown && children}
        </>
    );
};

const Menu: React.FC<{}> = ({ children }) => {
    // console.log('%c children:', 'background: #ffcc00; color: #003300', children);

    let test = useResponsiveValue<'10px' | '20px'>(['10px', '20px', '10px', '20px']);
    const menuPointer = useResponsiveValue<'sticky' | 'unset'>(['unset', 'unset', 'unset', 'sticky']);
    const index = useBreakpointIndex();

    const [menuOn, setMenuOn] = useState(false);

    const content = () => {
        return (
            <Box
                sx={{
                    bg: '#555',
                    px: 20,
                    py: 10,
                    userSelect: 'none',
                }}
            >
                <List title="Trasy">
                    <Item text="Lista Tras" target="/routes" />
                    <Item text="Statystyki Tras" target="/routessum" />
                </List>
                <Splitter />
                <List title="Teksty">
                    <Item text="Regulaminy" target="/" />
                    <Item text="Polityka Prywatności" target="/" />
                </List>
            </Box>
        );
    };

    const hiddeManeu = {
        height: 0,
    };

    if (index < 2) {
        return (
            <Box
                sx={{
                    maxWidth: '250px',
                    position: 'sticky',
                    top: 0,
                    left: 0,
                    height: '40px',
                    bg: menuOn ? '#555' : 'transparent',
                    overflow: menuOn ? 'visible' : 'hidden',
                }}
            >
                <Button
                    onClick={() => {
                        setMenuOn(!menuOn);
                    }}
                    sx={{
                        width: '60px',
                        px: 0,
                        borderRadius: 0,
                        bg: '#444',
                        cursor: 'pointer',
                    }}
                >
                    Menu
                </Button>
                <Container sx={menuOn ? {} : hiddeManeu}>{content()}</Container>
            </Box>
        );
    } else {
        return (
            <Container
                sx={{
                    maxWidth: '250px',
                    position: 'sticky',
                    top: 20,
                    bg: '#555',
                }}
            >
                {content()}
            </Container>
        );
    }
};
export default Menu;
