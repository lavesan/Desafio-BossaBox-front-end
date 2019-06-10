import React from 'react';
// @ts-ignore
import Modal from 'react-awesome-modal';
import { StyledModalBody } from '../card/styles';
import { SuccessButton, DangerButton } from '../buttons/styles';
import { ToolService } from '../../services/tool.service';

interface IPropsDeleteModal {
    visible: boolean,
    removeModalInfo: {
        id: number,
        title: string,
    } 
    manageVisibilityRemoveToolModal: (visible: boolean) => void,
    reloadTools: () => void
}

export const DeleteToolModal: React.FunctionComponent<IPropsDeleteModal> = function({ visible, removeModalInfo: { id, title }, manageVisibilityRemoveToolModal, reloadTools }) {

    const toolService: ToolService = new ToolService();

    const closeModal = function(): void {
        manageVisibilityRemoveToolModal(false);
    }
    
    const removeTool = function(id: number): void {
        toolService.deleteTool(id).then(res => {
            if (res.status === 200) {
                closeModal()
                reloadTools();
            }
        });
    }

    return (
        <Modal visible={visible} width="450" effect="fadeInUp" onClickAway={() => closeModal()}>
            <StyledModalBody>
                <h1>X Remove tool</h1>
                <p>Are you sure you want to remove <strong>{title}</strong>?</p>
                <div className="button-box">
                    <DangerButton onClick={() => closeModal()}>Cancel</DangerButton>
                    <SuccessButton onClick={() => removeTool(id)}>Yes, remove</SuccessButton>
                </div>
            </StyledModalBody>
        </Modal>
    )
}