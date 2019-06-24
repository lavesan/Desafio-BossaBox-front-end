import React, { useState } from 'react';
// @ts-ignore
import Modal from 'react-awesome-modal';
import { StyledModalBody } from '../card/styles';
import { SpinnerStyle } from './styles';
import { SuccessButton, DangerButton } from '../buttons';
import { ToolService } from '../../services';
import { Spinner } from '../loadingSpinner';
import { IPropsDeleteModal } from './interfaces';

export const DeleteToolModal: React.FunctionComponent<IPropsDeleteModal> = function({ visible, removeModalInfo: { id, title }, manageVisibilityRemoveToolModal, reloadTools }) {
    const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

    const toolService: ToolService = new ToolService();

    /**
     * @description Closes the modal
     */
    const closeModal = function(): void {
        manageVisibilityRemoveToolModal(false);
    }
    
    /**
     * @description remove the tool loaded on modal by id
     * @param {number} id 
     */
    const removeTool = function(id: number): void {
        setLoadingSubmit(true);
        toolService.deleteTool(id).then(res => {
            setLoadingSubmit(false);
            if (res.status === 200) {
                closeModal()
                reloadTools();
            }
        }).catch(() => {
            setLoadingSubmit(false);
        });
    }

    return (
        <Modal visible={visible} width="450" effect="fadeInUp" onClickAway={() => closeModal()}>
            <StyledModalBody>
                <h1>X Remove tool</h1>
                <p>Are you sure you want to remove <strong>{title}</strong>?</p>
                <div className="button-box">
                    <DangerButton disable={loadingSubmit} onClick={() => closeModal()}>Cancel</DangerButton>
                    <SuccessButton disable={loadingSubmit} onClick={() => removeTool(id)}>Yes, remove</SuccessButton>
                </div>
                {loadingSubmit && <Spinner style={SpinnerStyle} />}
            </StyledModalBody>
        </Modal>
    )
}