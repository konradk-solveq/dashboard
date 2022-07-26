import styled from '@emotion/styled';
import { format, parseJSON } from 'date-fns';
import React, { useContext, useRef } from 'react';
import { Button, Flex, Heading, Spinner } from 'theme-ui';
import { ManagePublicationsContext } from '../../../contexts/publication/ManagePublication';
import { DeleteModalProps } from '../../../typings/ManagePublications';

const Backdrop = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.4);
`;

const Container = styled.div`
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 35%;
    min-width: 500px;
    padding: 16px 32px;
    background-color: white;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    text-align: center;
`;

const DeleteModal: React.FC<DeleteModalProps> = ({ item, setDeleteModalState }) => {
    const { publicationDeletion } = useContext(ManagePublicationsContext);

    const modalRef = useRef();

    const closeModalOnBackgroundClick = (e: React.MouseEvent<HTMLElement>) => {
        if (modalRef.current === e.target) {
            setDeleteModalState((prev) => !prev);
        }
    };

    if (publicationDeletion.isLoading) {
        return (
            <Backdrop>
                <Container>
                    <Spinner m={40} />
                </Container>
            </Backdrop>
        );
    }

    if (publicationDeletion.isSuccess) {
        return (
            <Backdrop>
                <Container>
                    <Heading m={10}>Pomyślnie usunięto zaplanowaną publikację</Heading>
                    <Button sx={{ margin: '30px 0 10px' }} onClick={() => setDeleteModalState((prev) => !prev)}>
                        Wróć
                    </Button>
                </Container>
            </Backdrop>
        );
    }

    if (publicationDeletion.isError) {
        console.log(publicationDeletion);
        return (
            <Backdrop>
                <Container>
                    <Heading m={10}>
                        Nie udało się usunąć publikacji {<br />} {publicationDeletion.error.message}
                    </Heading>
                    <Button sx={{ margin: '30px 0 10px' }} onClick={() => setDeleteModalState((prev) => !prev)}>
                        Wróć
                    </Button>
                </Container>
            </Backdrop>
        );
    }

    return (
        <Backdrop ref={modalRef} onClick={closeModalOnBackgroundClick}>
            <Container>
                <Heading m={10} sx={{ lineHeight: '50px' }}>
                    Czy jesteś pewien że chcesz usunąć publikację z pliku {item.pair.oldDocument.name} na plik{' '}
                    {item.pair.newDocument.name} <br /> zaplanowaną na{' '}
                    {format(parseJSON(item.showDate), 'dd-MM-yyyy HH:mm')}?
                </Heading>
                <Flex sx={{ justifyContent: 'center', gap: '15px', margin: '30px 0 10px' }}>
                    <Button bg="grey" type="button" onClick={() => setDeleteModalState((prev) => !prev)}>
                        Nie
                    </Button>
                    <Button onClick={() => publicationDeletion.mutate(item.id)}>Tak</Button>
                </Flex>
            </Container>
        </Backdrop>
    );
};

export default DeleteModal;
