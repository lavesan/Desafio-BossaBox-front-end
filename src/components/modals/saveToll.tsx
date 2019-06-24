import React, { useState } from 'react';
// @ts-ignore
import Modal from 'react-awesome-modal';
import { StyledModalBody } from '../card/styles';
import { SuccessButton, DangerButton } from '../buttons';
import { StyledTextInput, StyledTextArea } from '../inputs';
import { ToolService } from '../../services';
import { StyledFormBox } from './styles'
import { Formik, ErrorMessage } from 'formik';
import styled from 'styled-components';
import { saveToolValidation } from './validations'
import { Spinner } from '../loadingSpinner'

const StyledErrorMessage = styled(ErrorMessage)`
    color: ${props => props.theme.danger.primaryColor};
    font-size: 0.9rem;
    margin: 2px 0;
    text-align: right;
`

interface IPropsSaveToll {
    visible: boolean, 
    manageVisibilitySaveToolModal: (visible: boolean) => void,
    reloadTools: () => void
}

export const SaveToolModal: React.FunctionComponent<IPropsSaveToll> = function({ visible, manageVisibilitySaveToolModal, reloadTools }) {
    const [loadingSubmit, setLoadingSubmit] = useState(false);

    const toolService: ToolService = new ToolService();
    const [initialFormikValues] = useState({
        title: '',
        link: '',
        description: '',
        tags: ''
    })

    const closeModal = function(): void {
        manageVisibilitySaveToolModal(false);
    }

    const handleSubmit = function(tool: any): void {
        let newTool = tool;
        newTool.tags = newTool.tags.split(' ');
        setLoadingSubmit(true);
        toolService.saveTool(newTool).then(res => {
            setLoadingSubmit(false);
            if (res.status === 201) {
                closeModal();
                reloadTools();
            }
        })
    }

    return (
        <Modal visible={visible} width="600" effect="fadeInUp" onClickAway={() => closeModal()}>
            <StyledModalBody>
                {loadingSubmit && <Spinner style={{ position: 'absolute', left: '50%', top: '50%' }} />}
                <h1>+ Add tool</h1>
                <Formik initialValues={initialFormikValues} onSubmit={handleSubmit} validationSchema={saveToolValidation}>
                    {({ handleChange, handleSubmit, values, errors }) => (
                        <StyledFormBox onSubmit={handleSubmit}>
                            <div>
                                <p>Tool Name *</p>
                                <StyledTextInput type="text" invalid={errors.title} disable={loadingSubmit} name="title" onChange={handleChange} value={values.title} style={{ width: '100%' }} />
                                <StyledErrorMessage name="title" component="p" />
                            </div>
                            <div>
                                <p>Tool Link *</p>
                                <StyledTextInput type="text" invalid={errors.link} disable={loadingSubmit} name="link" onChange={handleChange} value={values.link} style={{ width: '100%' }} />
                                <StyledErrorMessage name="link" component="p" />
                            </div>
                            <div>
                                <p>Tool description *</p>
                                <StyledTextArea rows={3} invalid={errors.description} disable={loadingSubmit} name="description" onChange={handleChange} value={values.description} style={{ width: '100%', resize: 'none' }}></StyledTextArea>
                                <StyledErrorMessage name="description" component="p" />
                            </div>
                            <div>
                                <p>Tags *</p>
                                <StyledTextInput type="text" invalid={errors.tags} disable={loadingSubmit} name="tags" onChange={handleChange} value={values.tags} style={{ width: '100%' }} />
                                <StyledErrorMessage name="tags" component="p" />
                            </div>
                            <div className="button-box">
                                <DangerButton type="button" disable={loadingSubmit} onClick={() => closeModal()}>Cancel</DangerButton>
                                <SuccessButton type="submit" disable={loadingSubmit}>Add tool</SuccessButton>
                            </div>
                        </StyledFormBox>
                    )
                    }
                </Formik>
            </StyledModalBody>
        </Modal>
    )
}
