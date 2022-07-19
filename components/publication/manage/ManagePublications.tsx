import React, { useContext } from 'react';
import { Grid, Heading } from 'theme-ui';

import { ManagePublicationsContext } from '../../contexts/publication/ManagePublication';
import ManagePublicationsRow from './ManagePublicationRow';
import Sort from './Sort';
import ManagePublicationsPagination from './ManagePublicationsPagination';

const PostPublication: React.FC = () => {
    const { publications } = useContext(ManagePublicationsContext);

    return (
        <>
            <Grid
                gap={2}
                columns="1fr 1fr 1fr 1fr 1fr 60px 1fr"
                sx={{ alignItems: 'center', justifyItems: 'center', textAlign: 'center', marginBottom: '40px' }}
            >
                <Heading>Typ Publikacji</Heading>
                <Heading>Aktualny dokument</Heading>
                <Heading>Nowy dokument</Heading>
                <Heading>Data pokazania</Heading>
                <Heading>Data wygaśniecia starego dokumentu</Heading>
                <Heading>Draft</Heading>

                <Sort />
            </Grid>
            {publications?.map((item) => (
                <ManagePublicationsRow key={item.id} item={item} />
            ))}
            <ManagePublicationsPagination />
        </>
    );
};

export default PostPublication;
