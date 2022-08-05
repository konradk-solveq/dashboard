import React from 'react';
import { Box, Typography, IconButton } from '@mui/material/';
import CloseIcon from '@mui/icons-material/Close';
interface Props {
    children?: any;
    refProps?: any;
    onCloseFunction?: () => void;
    onClickRef?: (e: React.MouseEvent<HTMLElement>) => void;
    title?: string;
    closeIcon?: boolean;
}

const Modal: React.FC<Props> = ({ children, refProps, title, onCloseFunction, onClickRef, closeIcon }: Props) => {
    return (
        <Box className="content" ref={refProps} onClick={onClickRef}>
            <Box className="contentblock">
                {title && <Typography variant="h3">{title}</Typography>}
                {closeIcon && (
                    <IconButton sx={{ position: 'absolute', right: 10, top: 12 }} onClick={onCloseFunction}>
                        <CloseIcon />
                    </IconButton>
                )}
                {children}
            </Box>
        </Box>
    );
};

export default Modal;
