import React, { useContext, useRef } from 'react';
import { CircularProgress, Box } from '@mui/material/';
import { ManageWebhookContext } from '../contexts/settings/ManageWebhook';
import Delete from './modal-states/Delete';
import EditCreate from './modal-states/EditCreate';
import Error from './modal-states/Error';
import Success from './modal-states/Success';
import Modal from '../../assets/components/modal';

const EditModal: React.FC = () => {
    const { manageModalState, modalState, modalType, isLoading } = useContext(ManageWebhookContext);
    const modalRef = useRef<HTMLInputElement | null>(null);

    const closeModal = (e: React.MouseEvent<HTMLElement>) => {
        if (modalRef.current === e.target) {
            manageModalState();
        }
    };

    if (isLoading) {
        return (
            <Box className="content">
                <Box>
                    <CircularProgress sx={{ margin: 40 }} />
                </Box>
            </Box>
        );
    }

    return (
        <Modal refProps={modalRef} onClickRef={closeModal}>
            {modalState.type === modalType[0] && <EditCreate />}
            {modalState.type === modalType[1] && <Delete />}
            {modalState.type === modalType[2] && <Error />}
            {modalState.type === modalType[3] && <Success />}
        </Modal>
    );
};

export default EditModal;
