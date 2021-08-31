import { Flex, Container, Text, Grid, StylePropertyValue, Box } from 'theme-ui';
import Header from './Header';
import Arrangement from './arrangement/Arrangement';
import Footer from './Footer';
import { signIn, useSession } from 'next-auth/client';
import { useEffect } from 'react';
import { useResponsiveValue, useBreakpointIndex } from '@theme-ui/match-media'



const Tester: React.FC<{}> = ({ children }) => {
    // console.log('%c children:', 'background: #ffcc00; color: #003300', children);

    let test = useResponsiveValue<'10px' | '20px'>(['10px', '20px', '10px', '20px']);
    const menuPointer = useResponsiveValue<'sticky' | 'unset'>(['unset', 'unset', 'unset', 'sticky']);
    const index = useBreakpointIndex()

    const sxText = {
        mx: '30px',
        bg: 'khaki',
    }

    return (
        <Flex sx={{
            bg: ['#23A856', '#73A831', '#A89639', '#A86F31', '#A83428'],
            flexDirection: 'column',
            alignItems: 'center',
            position: 'fixed',
            left: [100, 100, 450, 450],
            top: 10,
            border: '1px solid green',
            opacity: .7,
            minWidth: [100, 100, 150, 150],
            minHeight: 30,
            borderRadius: 10,
            fontSize: 20,
            fontFamily: 'din-b',
            color: '#fff',
        }}>
            <Box
                sx={{
                    
                }}
            >{index}</Box>
        </Flex>

    );
};
export default Tester;

