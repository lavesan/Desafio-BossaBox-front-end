import React from 'react';
// @ts-ignore
import Modal from 'react-awesome-modal';
import { StyledModalBody } from '../card/styles';
import { SuccessButton, DangerButton } from '../buttons/styles';
import { ToolService } from '../../services/tool.service';

export class DeleteToolModal extends React.Component {

    props: {
        visible: boolean, 
        id: number, 
        title: string, 
        manageVisibilityRemoveToolModal: (visible: boolean) => void,
        reloadTools: () => void
    }

    state = {
        visible: false, 
        id: -1, 
        title: ''
    }

    constructor(props: any) {
        super(props)
        this.props = props;
    }

    closeModal = (): void => {
        this.props.manageVisibilityRemoveToolModal(false);
    }
    
    removeTool = (id: number): void => {
        ToolService.prototype.deleteTool(id).then(res => {
            if (res.status === 200) {
                this.closeModal()
                this.props.reloadTools();
            }
        });
    }

    componentWillReceiveProps(newProps: any) {
        this.setState({ showDeleteToolModal: newProps.showDeleteToolModal })
    }

    render() {
        const { title, id, visible } = this.props;

        return (
            <Modal visible={visible} width="450" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                <StyledModalBody>
                    <h1>X Remove tool</h1>
                    <p>Are you sure you want to remove <strong>{title}</strong>?</p>
                    <div className="button-box">
                        <DangerButton onClick={() => this.closeModal()}>Cancel</DangerButton>
                        <SuccessButton onClick={() => this.removeTool(id)}>Yes, remove</SuccessButton>
                    </div>
                </StyledModalBody>
            </Modal>
        )
    }
} 
