import { useResponsiveValue } from '@theme-ui/match-media';
import React from 'react';
import { Box, Container, Flex } from 'theme-ui';

const Footer: React.FC<{}> = ({ children }) => {
    const footerPart = useResponsiveValue<'sticky' | 'unset'>(['unset', 'unset', 'unset', 'sticky']);

    return (
        <Container
            sx={{
                px: 5,
                // bg: '#f8f8f8',
                p: 2,
                mt: '5px',
                borderTop: '1px solid #ddd',
                position: 'relative',
                bottom: 0,
            }}
        >
            <Flex
                sx={{
                    flexDirection: ['column', 'row', 'row', 'row', 'row'],
                    justifyContent: 'stretch',
                    width: '100%',
                }}
            >
                <Flex
                    sx={{
                        flexDirection: ['column', 'column', 'row', 'row', 'row'],
                        justifyContent: 'stretch',
                        width: ['100%', '50%', '50%', '50%', '50%'],
                    }}
                >
                    <Container
                        sx={{
                            borderRight: [
                                'none',
                                '1px solid #ddd',
                                '1px solid #ddd',
                                '1px solid #ddd',
                                '1px solid #ddd',
                            ],
                            borderBottom: ['1px solid #ddd', '1px solid #ddd', 'none', 'none', 'none'],
                            justifyContent: 'start',
                            pl: 30,
                        }}
                    >
                        text
                    </Container>
                    <Container
                        sx={{
                            borderRight: [
                                'none',
                                '1px solid #ddd',
                                '1px solid #ddd',
                                '1px solid #ddd',
                                '1px solid #ddd',
                            ],
                            borderBottom: ['1px solid #ddd', 'none', 'none', 'none', 'none'],
                            justifyContent: 'start',
                            pl: 30,
                        }}
                    >
                        text
                    </Container>
                </Flex>
                <Flex
                    sx={{
                        flexDirection: ['column', 'column', 'row', 'row', 'row'],
                        justifyContent: 'stretch',
                        width: ['100%', '50%', '50%', '50%', '50%'],
                    }}
                >
                    <Container
                        sx={{
                            borderRight: ['none', 'none', '1px solid #ddd', '1px solid #ddd', '1px solid #ddd'],
                            borderBottom: ['1px solid #ddd', '1px solid #ddd', 'none', 'none', 'none'],
                            justifyContent: 'start',
                            pl: 30,
                        }}
                    >
                        text
                    </Container>
                    <Container
                        sx={{
                            // borderRight: ['none', 'none', '1px solid #ddd', '1px solid #ddd', '1px solid #ddd'],
                            justifyContent: 'start',
                            pl: 30,
                        }}
                    >
                        text
                    </Container>
                </Flex>
            </Flex>
            <Flex
                sx={{
                    justifyContent: 'center',
                    width: '100%',
                    whiteSpace: 'nowrap',
                }}
            >
                <Box
                    sx={{
                        borderTop: '1px solid #ddd',
                        px: 50,
                        pt: '5px',
                        mt: 15,
                    }}
                >
                    2021 Kross. All rights reserved{' '}
                </Box>
            </Flex>
        </Container>
    );
};
export default Footer;
