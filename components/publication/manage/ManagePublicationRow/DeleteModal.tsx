import styled from '@emotion/styled';
import { format, parseJSON } from 'date-fns';
import React, { useCallback, useContext, useMemo, useRef } from 'react';
import { Button, Box, Typography, CircularProgress } from '@mui/material';
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
    const { apiHandler, deletePublication, isLoading, errorMessage, isError, setIsError, isSuccess, setIsSuccess } =
        useContext(ManagePublicationsContext);

    const modalRef = useRef();

    const handleDelete = useCallback(async () => {
        apiHandler(await deletePublication(item.id), item.id, 'delete');
        setDeleteModalState(true);
    }, [item.id]);

    const closeModalOnBackgroundClick = (e: React.MouseEvent<HTMLElement>) => {
        if (modalRef.current === e.target) {
            setDeleteModalState((prev) => !prev);
        }
    };

    const handleCloseClick = useCallback(() => {
        if (isSuccess) {
            setIsSuccess((prev: boolean) => !prev);
        }
        if (isError) {
            setIsError((prev: boolean) => !prev);
        }
        setDeleteModalState((prev) => !prev);
    }, [isError, isSuccess]);

    if (isLoading) {
        return (
            <Backdrop>
                <Container>
                    <CircularProgress sx={{ m: 40 }} />
                </Container>
            </Backdrop>
        );
    }

    if (isSuccess) {
        return (
            <Backdrop>
                <Container>
                    <Typography variant="h3" sx={{ m: 10 }}>
                        Pomyślnie usunięto zaplanowaną publikację
                    </Typography>
                    <Button variant="contained" sx={{ margin: '30px 0 10px' }} onClick={handleCloseClick}>
                        Wróć
                    </Button>
                </Container>
            </Backdrop>
        );
    }

    if (isError) {
        return (
            <Backdrop>
                <Container>
                    <Typography variant="h3" sx={{ m: 10 }}>
                        Nie udało się wysłać publikacji${<br />} {errorMessage.status}: {errorMessage.statusText}
                    </Typography>
                    <Button variant="contained" sx={{ margin: '30px 0 10px' }} onClick={handleCloseClick}>
                        Wróć
                    </Button>
                </Container>
            </Backdrop>
        );
    }

    return (
        <Backdrop ref={modalRef} onClick={closeModalOnBackgroundClick}>
            <Container>
                <Typography variant="h3" sx={{ m: 10, lineHeight: '50px' }}>
                    Czy jesteś pewien że chcesz usunąć publikację z pliku {item.pair.oldDocument.name} na plik{' '}
                    {item.pair.newDocument.name} <br /> zaplanowaną na{' '}
                    {format(parseJSON(item.showDate), 'dd-MM-yyyy HH:mm')}?
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: '15px', margin: '30px 0 10px' }}>
                    <Button variant="contained" color="success" type="button" onClick={handleCloseClick}>
                        Nie
                    </Button>
                    <Button variant="contained" color="error" onClick={handleDelete}>
                        Tak
                    </Button>
                </Box>
            </Container>
        </Backdrop>
    );
};

export default DeleteModal;
