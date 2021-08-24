import { signIn, useSession } from 'next-auth/client';
import { useEffect } from 'react';
import { Box, Flex, AspectRatio } from 'theme-ui';
import AnimKross from '../assets/krossLogoAnim';


const Home: React.FC<{}> = ({ }) => {
    return (
        <Flex
            sx={{
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
                }}>
                <AspectRatio
                    ratio={242/130}
                >
                    <AnimKross />
                </AspectRatio >
            </Box>
        </Flex>
    );
}

export default Home;