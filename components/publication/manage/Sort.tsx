import styled from '@emotion/styled';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Flex, Select } from 'theme-ui';
import { ManagePublicationsContext } from '../../contexts/publication/ManagePublication';
import { SortFormValues } from '../../typings/ManagePublications';

const Container = styled.form`
    width: 300px;
    height: 350px;
    position: absolute;
    top: 100%;
    background: white;
    border: 1px solid black;
    right: -120px;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    align-items: center;
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
        <Flex
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                flexDirection: 'column',
                justifyContent: 'center',
                textAlign: 'center',
                position: 'relative',
            }}
        >
            <Button onClick={() => setOpenModal((prev) => !prev)}>Opcje</Button>

            {openModal && (
                <Container>
                    <Flex mt={2} sx={{ flexDirection: 'column', gap: '5px' }}>
                        <label htmlFor="type">Typ publikacji</label>
                        <Select {...register('type')} sx={{ width: '180px', textAlign: 'center' }}>
                            <option value="policy">Polityka Prywatności</option>
                            <option value="terms">Regulamin</option>
                        </Select>
                    </Flex>
                    <Flex mt={2} sx={{ flexDirection: 'column', gap: '5px', alignItems: 'center' }}>
                        <label htmlFor="limit">Limit publikacji na stronie</label>
                        <Select {...register('limit')} sx={{ width: '60px' }}>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </Select>
                    </Flex>
                    <Flex mt={2} sx={{ flexDirection: 'column', gap: '5px', alignItems: 'center' }}>
                        <label htmlFor="order">Sortowanie</label>
                        <Select {...register('orderBy')} sx={{ width: '210px', textAlign: 'center' }}>
                            <option value={`${orderOptions[0]}_${orderByOptions[0]}`}>Data pokazania rosnąco</option>
                            <option value={`${orderOptions[1]}_${orderByOptions[0]}`}>Data pokazania malejąco</option>
                            <option value={`${orderOptions[0]}_${orderByOptions[1]}`}>Data publikacji rosnąco</option>
                            <option value={`${orderOptions[1]}_${orderByOptions[1]}`}>Data publikacji malejąco</option>
                            <option value={`${orderOptions[0]}_${orderByOptions[2]}`}>ID rosnąco</option>
                            <option value={`${orderOptions[1]}_${orderByOptions[2]}`}>ID malejąco</option>
                        </Select>
                    </Flex>
                    <Button type="submit">Zapisz</Button>
                </Container>
            )}
        </Flex>
    );
};

export default Sort;
