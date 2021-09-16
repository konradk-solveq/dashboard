import React from 'react';
import { Box, Grid, Link, AspectImage, Heading, Flex, AspectRatio } from 'theme-ui';
import NextLink from 'next/link';

const Tile: React.FC<{ bg: string; route: any; page: number; q: string }> = ({ bg, route, page, q }) => {
    const mapImages = route.images.find(({ type }) => type === 'map') || {};
    const squareImages = mapImages?.variants?.square;
    const image = squareImages ? squareImages[squareImages.length - 1] : null;

    return (
        <Grid sx={{ bg: bg, m: 1 }} columns={[1, '3fr ']} className="sys-btn">
            <NextLink
                href={{
                    pathname: '/routes/edit',
                    query: { routeId: route.id, page, q },
                }}
                passHref
            >
                <Link className="sys-btn">
                    <Box sx={{ overflow: 'hidden', p: 1 }}>
                        <Heading as="h3" sx={{ textAlign: 'center' }}>
                            <Box>{route.name}</Box>
                        </Heading>
                    </Box>
                    <Box p={1}>
                        <Box sx={{ color: '#fff' }}>
                            {image?.url && <AspectImage ratio={1} src={image?.url}></AspectImage>}
                            {!image?.url && (
                                <AspectRatio
                                    ratio={1}
                                    sx={{
                                        bg: '#555555',
                                    }}
                                >
                                    <Flex
                                        sx={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            height: '100%',
                                        }}
                                    >
                                        <Box sx={{ bg: '#313131', p: '10px' }}>no image</Box>
                                    </Flex>
                                </AspectRatio>
                            )}
                        </Box>
                    </Box>
                    <Box p={1}>{route.id}</Box>
                    <Box sx={{ padding: 1 }}>{route.author}</Box>
                    <Box sx={{ padding: 1 }}>{route.createdAt}</Box>
                </Link>
            </NextLink>
        </Grid>
    );
};

export default Tile;