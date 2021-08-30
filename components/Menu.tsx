import { Flex, Container, Grid, Link, Text, Box, Button } from 'theme-ui';
import Header from './Header';
import Footer from './Footer';
import Tester from './Tester';
import { signIn, useSession } from 'next-auth/client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useBreakpointIndex, useResponsiveValue } from '@theme-ui/match-media';
import Routing from 'next/link';

const item = (str, href, onclick) => {
    return (
        <Container
            sx={{
                pl: 10,
                fontSize: '18px',
                color: '#eee'
            }}
        >
            <Routing passHref href={href}>
                <Link
                    onClick={() => onclick()}
                >{str}</Link>
            </Routing>
        </Container>
    )
}

const spliter = () => {
    return (
        <Box
            sx={{
                width: '100%',
                height: '1px',
                // mx: 20,
                my: '5px',
                bg: '#777',
                // left: -10,
                position: 'relative',
            }}
        ></Box>
    )
}

const getList = (str: string, list) => {
    const [showList, setShowList] = useState(true);

    return (
        <>
            <Box
                sx={{
                    width: '100%',
                }}
                onClick={() => { setShowList(!showList) }}
            >
                <Text
                    sx={{
                        fontSize: '25px',
                        color: '#eee',
                    }}
                >{str}</Text>
            </Box>
            {showList && list}
            {spliter()}
        </>
    )
}

const Menu: React.FC<{}> = ({ children }) => {
    // console.log('%c children:', 'background: #ffcc00; color: #003300', children);

    let test = useResponsiveValue<'10px' | '20px'>(['10px', '20px', '10px', '20px']);
    const menuPointer = useResponsiveValue<'sticky' | 'unset'>(['unset', 'unset', 'unset', 'sticky']);
    const index = useBreakpointIndex()

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
                {getList('Trasy:', (<>
                    {item('Lista Tras', '/routes', () => setMenuOn(false))}
                </>)
                )}

                {getList('Teksty:', (<>
                    {item('Rogulaminy', '/', () => setMenuOn(false))}
                    {item('Polityka Pryatności', '/', () => setMenuOn(false))}
                </>)
                )}

                {getList('cdn...', (<></>))}
            </Box>
        )
    }

    const hiddeManeu = {
        height: 0,
    }

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
                    onClick={() => { setMenuOn(!menuOn) }}
                    sx={{
                        width: '60px',
                        px: 0,
                        borderRadius: 0,
                        bg: '#444',
                        cursor: 'pointer',
                    }}
                >Menu</Button>
                <Container
                    sx={menuOn ? {} : hiddeManeu}
                >
                    {content()}
                </Container>
            </Box>
        )
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

