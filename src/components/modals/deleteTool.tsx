import React from 'react';
// @ts-ignore
import Modal from 'react-awesome-modal';
import { StyledModalBody } from '../toolCard';
import { SuccessButton, DangerButton } from '../buttonComponent';
import { ToolService } from '../../services/tool.service';

export class DeleteToolModal extends React.Component {

    props: {showDeleteToolModal: boolean, id: number, title: string}

    state = {
        showDeleteToolModal: false, 
        id: -1, 
        title: ''
    }

    constructor(props: any) {
        super(props)
        this.props = props;
        this.state.showDeleteToolModal = props.showDeleteToolModal;
    }

    closeModal = (): void => {
        this.setState({ showDeleteToolModal: false })
    }
    
    removeTool = (id: number): void => {
        ToolService.prototype.deleteTool(id).then(res => {
            if (res.status === 200)
                this.closeModal()
        });
    }

    componentWillReceiveProps(newProps: any) {
        this.setState({ showDeleteToolModal: newProps.showDeleteToolModal })
    }

    render() {
        const { showDeleteToolModal } = this.state;
        const { title, id } = this.props;

        return (
            <Modal visible={showDeleteToolModal} width="450" effect="fadeInUp" onClickAway={() => this.closeModal()}>
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
