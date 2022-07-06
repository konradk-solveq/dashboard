import React from 'react';
import { Box, Container, Link, Typography, Card } from '@mui/material/';
import NoPhotographyIcon from '@mui/icons-material/NoPhotography';
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
                    <Card className="card-route">
                        <Typography variant="h5" sx={{ fontWeight: 400, textAlign: 'center', p: 1 }}>
                            {route.name}
                        </Typography>
                        <Box sx={{ p: 1 }}>
                            {image?.url ? (
                                <Box component="img" sx={{ width: '100%' }} src={image?.url}></Box>
                            ) : (
                                <Box
                                    sx={{
                                        minHeight: '320px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <NoPhotographyIcon />
                                </Box>
                            )}
                        </Box>
                        <Box sx={{ m: 1 }}>
                            <Typography variant="h5" sx={{ fontSize: '14px', fontWeight: '200' }}>
                                ID: {route.id}
                            </Typography>

                            <Typography variant="h5" sx={{ fontSize: '14px', fontWeight: '200' }}>
                                Autor: {route.author ? route.author : 'Brak Danych'}
                            </Typography>

                            <Typography variant="h5" sx={{ fontSize: '14px', fontWeight: '200' }}>
                                Data:{route.createdAt}
                            </Typography>
                        </Box>
                    </Card>
                </Link>
            </NextLink>
        </Container>
    );
};

export default Tile;
