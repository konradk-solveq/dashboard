import React, { useContext } from 'react';
import { Box, Container, TextField, Grid } from '@mui/material/';
import ApiContext from '../../components/contexts/api';
import { FeaturedSectionContext } from '../../components/contexts/featured/contexts';
import Actions from './Actions';
import SectionRoutesManage from './SectionsRoutesManage';

const SectionNameInput: React.FC<{ language: string; code: string; currentValue?: string }> = ({
    currentValue = '',
    code,
    language,
}) => {
    const {
        setName,
        section: { sectionId },
    } = useContext(FeaturedSectionContext);

    const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setName((d) => {
            return { ...d, [code]: e.target.value };
        });
    };

    return (
        <Container>
            <TextField
                sx={{ backgroundColor: 'white' }}
                label={language}
                name={`${language}-${sectionId}`}
                defaultValue={currentValue}
                onChange={onChangeHandler}
            />
        </Container>
    );
};

const NameEdit: React.FC<{}> = () => {
    const { section } = useContext(FeaturedSectionContext);
    const { config } = useContext(ApiContext);

    return (
        <Box>
            {config.langs.map((e) => {
                return (
                    <SectionNameInput
                        key={e.name}
                        language={e.displayName}
                        code={e.name}
                        currentValue={section?.sectionName?.[e.name]}
                    />
                );
            })}
        </Box>
    );
};

const FeaturedRoute: React.FC<{}> = () => {
    return (
        <Container>
            <Grid
                sx={{
                    display: 'grid',
                    gridTemplateColumns: [2, '12fr 4fr'],
                    mb: '10px',
                    p: 2,
                    backgroundColor: 'gray',
                }}
            >
                <NameEdit />
                <Actions />
            </Grid>
            <Box sx={{ backgroundColor: 'gray', p: 2 }}>
                <SectionRoutesManage />
            </Box>
            <Box m={1} />
        </Container>
    );
};

export default FeaturedRoute;
