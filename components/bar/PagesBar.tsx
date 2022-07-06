import React from 'react';
import { Pagination } from '@mui/material';

interface Props {
    page: any;
    pages: any;
    setPage: Function;
}

const PagesBar: React.FC<Props> = ({ page, pages, setPage }: Props) => {
    return (
        <Pagination
            count={pages.length}
            page={page}
            showFirstButton
            showLastButton
            onChange={(e, value) => setPage(value)}
        ></Pagination>
    );
};

export default PagesBar;
