import React, {  } from 'react';
import { Box, Button, Flex,  } from 'theme-ui';

interface Props {
    page: any;
    pages: any;
    setPage: (Function);
    scroll: number;
    handleScrollRight: Function;
    handleScrolLeft: Function;
    barRef?: any; // dodawany tlko raz na stronę
}


const PagesBar: React.FC<Props> = ({
    page,
    pages,
    setPage,
    scroll,
    handleScrollRight,
    handleScrolLeft,
    barRef,
}: Props) => {

    return (
        <Flex sx={{
            mt: '30px',
            mb: '20px',
            minWidth: '100%',
        }}>
            <Button
                sx={{
                    p: '1px',
                    textAlign: 'center',
                    minWidth: '40px',
                    minHeight: '40px',
                    borderRadius: '50px',
                    mr: '3px',
                    cursor: 'pointer',
                }}
                className='sys-btn'
                onClick={() => { handleScrollRight(true); }}
            >&lt;&lt;&lt;</Button>
            <Button
                sx={{
                    p: '1px',
                    textAlign: 'center',
                    minWidth: '40px',
                    minHeight: '40px',
                    borderRadius: '50px',
                    mr: '10px',
                    cursor: 'pointer',
                }}
                className='sys-btn'
                onClick={() => { handleScrollRight(); }}
            >&lt;</Button>
            <Box
                ref={barRef}
                sx={{
                    overflow: 'hidden',
                }}
            >
                <Flex
                    className='bar-scroll'
                    sx={{
                        msJustifySelf: 'stretch',
                        position: 'relative',
                        left: scroll + 'px',
                        flexWrap: 'nowrap',
                    }}
                >
                    {pages.map((thePage) => {
                        return (
                            <Button
                                sx={{
                                    mr: '2px',
                                    p: '1px',
                                    textAlign: 'center',
                                    minWidth: '40px',
                                    minHeight: '40px',
                                    cursor: 'pointer',
                                }}
                                bg={thePage === page ? '#555' : 'primary'}
                                className='sys-btn'
                                key={thePage}
                                onClick={(e) => setPage(thePage)}
                            >
                                {thePage}
                            </Button>
                        );
                    })}
                </Flex>
            </Box>
            <Button
                onClick={() => handleScrolLeft()}
                sx={{
                    p: '1px',
                    textAlign: 'center',
                    minWidth: '40px',
                    minHeight: '40px',
                    borderRadius: '50px',
                    ml: '10px',
                    cursor: 'pointer',
                }}
                className='sys-btn'
            >&gt;</Button>
            <Flex
                sx={{
                    minWidth: '40px',
                    minHeight: '40px',
                    bx: 'khaki',
                    position: 'relative',
                }}
            >
                <Button
                    onClick={() => handleScrolLeft(true)}
                    sx={{
                        p: '1px',
                        textAlign: 'center',
                        minWidth: '40px',
                        minHeight: '40px',
                        borderRadius: '50px',
                        ml: '3px',
                        cursor: 'pointer',
                    }}
                    className='sys-btn'
                >&gt;&gt;&gt;</Button>
                <Box sx={{
                    position: 'absolute',
                    left: '2px',
                    width: '40px',
                    fontSize: '24px',
                    fontFamily: 'din-l',
                    textAlign: 'center',
                    top: '-30px',
                }}>{pages.length}</Box>
            </Flex>
        </Flex>

    )
}

export default PagesBar;