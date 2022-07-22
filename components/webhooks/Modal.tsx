import React, { useContext, useRef } from 'react';
import { CircularProgress } from '@mui/material/';
import styled from '@emotion/styled';

import { ManageWebhookContext } from '../contexts/settings/ManageWebhook';
import Delete from './modal-states/Delete';
import EditCreate from './modal-states/EditCreate';
import Error from './modal-states/Error';
import Success from './modal-states/Success';

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
    width: 30%;
    min-width: 500px;
    padding: 16px 32px;
    background-color: white;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

const EditModal: React.FC = () => {
    const { manageModalState, modalState, modalType, isLoading } = useContext(ManageWebhookContext);
    const modalRef = useRef();

    const closeModal = (e: React.MouseEvent<HTMLElement>) => {
        if (modalRef.current === e.target) {
            manageModalState();
        }
    };

    if (isLoading) {
        return (
            <Backdrop>
                <Container>
                    <CircularProgress sx={{ margin: 40 }} />
                </Container>
            </Backdrop>
        );
    }

    return (
        <Backdrop ref={modalRef} onClick={closeModal}>
            <Container>
                {modalState.type === modalType[0] && <EditCreate />}
                {modalState.type === modalType[1] && <Delete />}
                {modalState.type === modalType[2] && <Error />}
                {modalState.type === modalType[3] && <Success />}
            </Container>
        </Backdrop>
    );
};

export default EditModal;
