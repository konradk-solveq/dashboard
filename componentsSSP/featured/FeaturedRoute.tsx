import React, { useContext } from 'react';
import { Box, Container, Field, Grid } from 'theme-ui';
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
            <Field
                bg="white"
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
            <Grid bg="gray" p={2} variant="block" gap={2} columns={[2, '12fr 4fr']}>
                <NameEdit />
                <Actions />
            </Grid>
            <Box bg="gray" p={2} variant="block">
                <SectionRoutesManage />
            </Box>
            <Box m={1} />
        </Container>
    );
};

export default FeaturedRoute;
