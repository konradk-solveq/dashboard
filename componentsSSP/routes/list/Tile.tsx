import React from 'react';
import { Box, Container, Link, Typography } from '@mui/material/';
import NextLink from 'next/link';

const Tile: React.FC<{ bg: string; route: any; page: number; q: string }> = ({ bg, route, page, q }) => {
    const mapImages = route.images.find(({ type }) => type === 'map') || {};
    const squareImages = mapImages?.variants?.square;
    const image = squareImages ? squareImages[squareImages.length - 1] : null;

    return (
        <Container sx={{ bg: bg, m: 1, display: 'grid', gridTemplateColumns: [1, '3fr '] }} className="sys-btn">
            <NextLink
                href={{
                    pathname: '/routes/edit',
                    query: { routeId: route.id, page, q },
                }}
                passHref
            >
                <Link className="sys-btn">
                    <Box sx={{ overflow: 'hidden', p: 1 }}>
                        <Typography variant="h3" sx={{ textAlign: 'center' }}>
                            <Box>{route.name}</Box>
                        </Typography>
                    </Box>
                    <Box p={1}>
                        <Box sx={{ color: '#fff' }}>
                            {image?.url && <Box component="img" sx={{ width: '100%' }} src={image?.url}></Box>}
                            {!image?.url && (
                                <Box
                                    sx={{
                                        bg: '#555555',
                                        width: '100%',
                                    }}
                                >
                                    <Container
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            height: '100%',
                                        }}
                                    >
                                        <Box sx={{ bg: '#313131', p: '10px' }}>no image</Box>
                                    </Container>
                                </Box>
                            )}
                        </Box>
                    </Box>
                    <Box p={1}>{route.id}</Box>
                    <Box sx={{ padding: 1 }}>{route.author}</Box>
                    <Box sx={{ padding: 1 }}>{route.createdAt}</Box>
                </Link>
            </NextLink>
        </Container>
    );
};

export default Tile;
