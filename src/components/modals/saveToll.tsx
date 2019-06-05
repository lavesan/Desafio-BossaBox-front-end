import React from 'react';
// @ts-ignore
import Modal from 'react-awesome-modal';
import { StyledModalBody } from '../card/styles';
import { SuccessButton, DangerButton } from '../buttons/styles';
import { StyledTextInput, StyledTextArea } from '../inputs/inputComponents';
import { ToolService } from '../../services/tool.service';
import { StyledFormBox } from './styles'
import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';

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
        })
    }

    componentWillReceiveProps(newProps: any) {
        this.setState({ visible: newProps.visible })
    }

    render() {
        const validations = yup.object().shape({
            title: yup.string().required(),
            link: yup.string().required(),
            description: yup.string().required(),
            tags: yup.string().required()
        })

        return (
            <Modal visible={this.props.visible} width="600" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                <StyledModalBody>
                    <h1>+ Add tool</h1>
                    <Formik initialValues={this.props.initialValues} onSubmit={this.handleSubmit} validationSchema={validations}>
                        {({ handleChange, handleSubmit, values }) => (
                            <StyledFormBox onSubmit={handleSubmit}>
                                <div>
                                    <p>Tool Name *</p>
                                    <StyledTextInput type="text" name="title" onChange={handleChange} value={values.title} style={{ width: '100%' }} />
                                    <ErrorMessage name="title" component="p" />
                                </div>
                                <div>
                                    <p>Tool Link *</p>
                                    <StyledTextInput type="text" name="link" onChange={handleChange} value={values.link} style={{ width: '100%' }} />
                                    <ErrorMessage name="link" component="p" />
                                </div>
                                <div>
                                    <p>Tool description *</p>
                                    <StyledTextArea rows={4} name="description" onChange={handleChange} value={values.description} style={{ width: '100%', resize: 'none' }}></StyledTextArea>
                                    <ErrorMessage name="description" component="p" />
                                </div>
                                <div>
                                    <p>Tags *</p>
                                    <StyledTextInput type="text" name="tags" onChange={handleChange} value={values.tags} style={{ width: '100%' }} />
                                    <ErrorMessage name="tags" component="p" />
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
