import React from 'react';
import { Pagination } from '@mui/material';

interface Props {
    page: any;
    pages: any;
    setPage: Function;
}

const PagesBar: React.FC<Props> = ({ page, pages, setPage }: Props) => (
    <Pagination
        count={pages.length}
        page={page}
        showFirstButton
        showLastButton
        color="secondary"
        onChange={(e, value) => setPage(value)}
    />
);

export default PagesBar;
