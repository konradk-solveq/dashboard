import React, { useContext } from 'react';
import { Box, Container, TextField, Input, InputLabel, Typography } from '@mui/material/';
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
        <Box sx={{ m: 1 }}>
            <TextField
                className="featured-text-field"
                size="small"
                color="primary"
                id={language}
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                label={<Typography variant="h4">{language}</Typography>}
                name={`${language}-${sectionId}`}
                defaultValue={currentValue ? currentValue : ''}
                onChange={onChangeHandler}
            />
        </Box>
    );
};

const NameEdit: React.FC<{}> = () => {
    const { section } = useContext(FeaturedSectionContext);
    const { config } = useContext(ApiContext);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', m: 1 }}>
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
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    p: '8px',
                    borderRadius: '15px',
                    backgroundColor: '#f0f0f0f0',
                    width: '100%',
                }}
            >
                <NameEdit />
                <Actions />
            </Box>
            <Box sx={{ p: 2 }}>
                <SectionRoutesManage />
            </Box>
        </Box>
    );
};

export default FeaturedRoute;
