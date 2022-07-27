import styled from '@emotion/styled';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Box, Select, MenuItem } from '@mui/material';
import { ManagePublicationsContext } from '../../contexts/publication/ManagePublication';
import { SortFormValues } from '../../typings/ManagePublications';

const Container = styled.form`
    width: 300px;
    height: 320px;
    position: absolute;
    top: 100%;
    background: white;
    border: 1px solid black;
    right: -120px;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    gap: 15px;
    text-align: center;
`;

const orderOptions = ['ASC', 'DESC'];
const orderByOptions = ['showDate', 'publicationDate', 'id'];

const Sort: React.FC = () => {
    const [openModal, setOpenModal] = useState(false);

    const { setParams } = useContext(ManagePublicationsContext);

    const { handleSubmit, register } = useForm<SortFormValues>({
        defaultValues: {
            type: 'policy',
            limit: 10,
            orderBy: `${orderOptions[0]}_${orderByOptions[0]}`,
        },
    });

    const onSubmit = (data: SortFormValues) => {
        const order = data.orderBy.split('_');
        setParams((prev) => ({ ...prev, limit: data.limit, type: data.type, order: order[0], orderBy: order[1] }));
        setOpenModal((prev) => !prev);
    };

    return (
        <Box
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                textAlign: 'center',
                position: 'relative',
            }}
        >
            <Button variant="contained" onClick={() => setOpenModal((prev) => !prev)}>
                Opcje
            </Button>

            {openModal && (
                <Container>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px', mt: '2' }}>
                        <label htmlFor="type">Typ publikacji</label>
                        <Select {...register('type')} sx={{ width: '210px' }} className="document-select-form">
                            <MenuItem style={{ fontSize: '14px' }} value="policy">
                                Polityka Prywatności
                            </MenuItem>
                            <MenuItem style={{ fontSize: '14px' }} value="terms">
                                Regulamin
                            </MenuItem>
                        </Select>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'center', mt: '2' }}>
                        <label htmlFor="limit">Limit publikacji na stronie</label>
                        <Select {...register('limit')} sx={{ width: '210px' }} className="document-select-form">
                            <MenuItem style={{ fontSize: '14px' }} value="10">
                                10
                            </MenuItem>
                            <MenuItem style={{ fontSize: '14px' }} value="20">
                                20
                            </MenuItem>
                            <MenuItem style={{ fontSize: '14px' }} value="50">
                                50
                            </MenuItem>
                            <MenuItem style={{ fontSize: '14px' }} value="100">
                                100
                            </MenuItem>
                        </Select>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'center', mt: '2' }}>
                        <label htmlFor="order">Sortowanie</label>
                        <Select {...register('orderBy')} sx={{ width: '210px' }} className="document-select-form">
                            <MenuItem style={{ fontSize: '14px' }} value={`${orderOptions[0]}_${orderByOptions[0]}`}>
                                Data pokazania rosnąco
                            </MenuItem>
                            <MenuItem style={{ fontSize: '14px' }} value={`${orderOptions[1]}_${orderByOptions[0]}`}>
                                Data pokazania malejąco
                            </MenuItem>
                            <MenuItem style={{ fontSize: '14px' }} value={`${orderOptions[0]}_${orderByOptions[1]}`}>
                                Data publikacji rosnąco
                            </MenuItem>
                            <MenuItem style={{ fontSize: '14px' }} value={`${orderOptions[1]}_${orderByOptions[1]}`}>
                                Data publikacji malejąco
                            </MenuItem>
                            <MenuItem style={{ fontSize: '14px' }} value={`${orderOptions[0]}_${orderByOptions[2]}`}>
                                ID rosnąco
                            </MenuItem>
                            <MenuItem style={{ fontSize: '14px' }} value={`${orderOptions[1]}_${orderByOptions[2]}`}>
                                ID malejąco
                            </MenuItem>
                        </Select>
                    </Box>
                    <Button type="submit" variant="contained">
                        Zapisz
                    </Button>
                </Container>
            )}
        </Box>
    );
};

export default Sort;
