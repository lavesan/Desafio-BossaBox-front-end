import React from 'react';
// @ts-ignore
import Modal from 'react-awesome-modal';
import { StyledModalBody } from '../card/styles';
import { SuccessButton, DangerButton } from '../buttons/styles';
import { StyledTextInput, StyledTextArea } from '../inputs/inputComponents';
import { Formik } from 'formik';
import { ToolService } from '../../services/tool.service';
import { StyledFormBox } from './styles'

export class SaveToolModal extends React.Component {
     
    props: { initialValues: { 
        title: string, 
        link: string, 
        description: string, 
        tags: string 
        }, 
        visible: boolean, 
        manageVisibilitySaveToolModal: (visible: boolean) => void,
        reloadTools: () => void
    }

    constructor(props: any) {
        super(props)
        this.props = props;
    }

    closeModal = (): void => {
        this.props.manageVisibilitySaveToolModal(false);
    }

    handleSubmit = (tool: any): void => {
        let newTool = tool;
        newTool.tags = newTool.tags.split(' ');
        ToolService.prototype.saveTool(newTool).then(res => {
            if (res.status === 201) {
                this.closeModal();
                this.props.reloadTools();
            }
            console.log(res);
        })
    }

    componentWillReceiveProps(newProps: any) {
        this.setState({ visible: newProps.visible })
    }

    render() {
        return (
            <Modal visible={this.props.visible} width="600" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                <StyledModalBody>
                    <h1>+ Add tool</h1>
                    <Formik initialValues={this.props.initialValues} onSubmit={this.handleSubmit}>
                        {({ handleChange, handleSubmit, values }) => (
                            <StyledFormBox onSubmit={handleSubmit}>
                                <div>
                                    <p>Tool Name *</p>
                                    <StyledTextInput type="text" name="title" onChange={handleChange} value={values.title} required style={{ width: '100%' }} />
                                </div>
                                <div>
                                    <p>Tool Link *</p>
                                    <StyledTextInput type="text" name="link" onChange={handleChange} value={values.link} required style={{ width: '100%' }} />
                                </div>
                                <div>
                                    <p>Tool description *</p>
                                    <StyledTextArea rows={4} name="description" onChange={handleChange} value={values.description} required style={{ width: '100%', resize: 'none' }}></StyledTextArea>
                                </div>
                                <div>
                                    <p>Tags *</p>
                                    <StyledTextInput type="text" name="tags" onChange={handleChange} value={values.tags} required style={{ width: '100%' }} />
                                </div>
                                <div className="button-box">
                                    <DangerButton type="button" onClick={() => this.closeModal()}>Cancel</DangerButton>
                                    <SuccessButton type="submit">Add tool</SuccessButton>
                                </div>
                            </StyledFormBox>
                        )
                        }
                    </Formik>
                </StyledModalBody>
            </Modal>
        )
    }
}
