import React from 'react';
import { Box } from '@mui/material';

interface IProps {
    children?: any;
    hover?: boolean;
}

const BigListItem: React.FC<IProps> = ({ children, hover }) => {
    return <Box className={hover ? 'list-item list-item-hover' : 'list-item'}>{children}</Box>;
};

export default BigListItem;
