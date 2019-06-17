import React, { useState } from 'react';
// @ts-ignore
import Modal from 'react-awesome-modal';
import { StyledModalBody } from '../card/styles';
import { SuccessButton, DangerButton } from '../buttons/styles';
import { ToolService } from '../../services/tool.service';
import { Spinner } from '../loadingSpinner/spinner'

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
    const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

    const toolService: ToolService = new ToolService();

    const closeModal = function(): void {
        manageVisibilityRemoveToolModal(false);
    }
    
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
                {loadingSubmit && <Spinner style={{ position: 'absolute', left: '50%', top: '50%' }} />}
            </StyledModalBody>
        </Modal>
    )
}