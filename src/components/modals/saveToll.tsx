import React from 'react';
// @ts-ignore
import Modal from 'react-awesome-modal';
import { StyledModalBody } from '../card/styles';
import { SuccessButton, DangerButton } from '../buttons/styles';
import { StyledTextInput, StyledTextArea } from '../inputs/styles';
import { ToolService } from '../../services/tool.service';
import { StyledFormBox } from './styles'
import { Formik, ErrorMessage, yupToFormErrors } from 'formik';
import styled from 'styled-components';
import { saveToolValidation } from './validations'

const StyledErrorMessage = styled(ErrorMessage)`
    color: ${props => props.theme.danger.primaryColor};
    font-size: 0.9rem;
    margin: 2px 0;
    text-align: right;
`

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

    constructor(props: any, private toolService: ToolService) {
        super(props)
        this.props = props;
        this.toolService = new ToolService();
    }

    closeModal = (): void => {
        this.props.manageVisibilitySaveToolModal(false);
    }

    handleSubmit = (tool: any): void => {
        saveToolValidation.isValid(this.props.initialValues).then((valid) => console.log('validando: ', valid))
        let newTool = tool;
        newTool.tags = newTool.tags.split(' ');
        this.toolService.saveTool(newTool).then(res => {
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
        return (
            <Modal visible={this.props.visible} width="600" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                <StyledModalBody>
                    <h1>+ Add tool</h1>
                    <Formik initialValues={this.props.initialValues} onSubmit={this.handleSubmit} validationSchema={saveToolValidation}>
                        {({ handleChange, handleSubmit, values, errors }) => (
                            <StyledFormBox onSubmit={handleSubmit}>
                                <div>
                                    <p>Tool Name *</p>
                                    <StyledTextInput type="text" invalid={errors.title} name="title" onChange={handleChange} value={values.title} style={{ width: '100%' }} />
                                    <StyledErrorMessage name="title" component="p" />
                                </div>
                                <div>
                                    <p>Tool Link *</p>
                                    <StyledTextInput type="text" invalid={errors.link} name="link" onChange={handleChange} value={values.link} style={{ width: '100%' }} />
                                    <StyledErrorMessage name="link" component="p" />
                                </div>
                                <div>
                                    <p>Tool description *</p>
                                    <StyledTextArea rows={3} invalid={errors.description} name="description" onChange={handleChange} value={values.description} style={{ width: '100%', resize: 'none' }}></StyledTextArea>
                                    <StyledErrorMessage name="description" component="p" />
                                </div>
                                <div>
                                    <p>Tags *</p>
                                    <StyledTextInput type="text" invalid={errors.tags} name="tags" onChange={handleChange} value={values.tags} style={{ width: '100%' }} />
                                    <StyledErrorMessage name="tags" component="p" />
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
