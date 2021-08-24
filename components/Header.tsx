import { signOut, useSession } from 'next-auth/client';
import Routing from 'next/link';
import React from 'react';
import { AspectRatio, Button, Container, Flex, Link, Heading, Box } from 'theme-ui';
import { useResponsiveValue, useBreakpointIndex } from '@theme-ui/match-media'
import Logo from '../assets/myKrossLogo'
import SmallLogo from '../assets/smallLogo';

const Header: React.FC<{}> = ({ children }) => {
    const [session, loading] = useSession();
    const index = useBreakpointIndex()

    const icon = (i) => {
        if (i < 2) {
            return (<Box
                className="logo"
                sx={{
                    pl: 10,
                    width: [70, 70, null, null, null],
                    minHeight: 48,
                }}>
                <AspectRatio
                    ratio={1 / 1}
                >
                    <SmallLogo />
                </AspectRatio >
            </Box>)
        } else {
            return (<Box
                className="logo"
                sx={{
                    pl: 20,
                    width: 300,
                    minHeight: 48,
                }}>
                <AspectRatio
                    ratio={748.9161 / 128.6318}
                >
                    <Logo />
                </AspectRatio >
            </Box>)
        }
    }

    return (
        <Flex sx={{ minHeight: 48, flexDirection: 'column', justifyContent: 'space-between' }}>
            <Flex sx={{
                // bg: '#f8f8f8',
                padding: 2,
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottom: '1px solid #ddd',
            }}>
                <Routing passHref href="/">
                    {icon(index)}
                </Routing>
                <Flex
                    sx={{
                        justifyContent: 'end',
                        flexDirection: 'column',
                        alignItems: 'flex-end'
                    }}>
                    {session && (
                        <>
                            <Container sx={{ position: 'relative', right: '0' }}>{session.user.email}</Container>
                            <Button sx={{ width: '100px', mt: '10px' }} onClick={() => signOut()}>Wyloguj</Button>
                        </>
                    )}
                </Flex>
            </Flex>
        </Flex>
    );
};
export default Header;
