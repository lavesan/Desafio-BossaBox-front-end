import React, { useState } from 'react';
// @ts-ignore
import Modal from 'react-awesome-modal';
import { StyledModalBody } from '../card/styles';
import { SpinnerStyle, StyledErrorMessage } from './styles';
import { StyledFormBox, StyledDescription } from './styles';
import { SuccessButton, DangerButton } from '../buttons';
import { StyledTextInput, StyledTextArea } from '../inputs';
import { ToolService } from '../../services';
import { IPropsSaveToll } from './interfaces';
import { IToolData } from '../../pages/home/interfaces';
import { Formik } from 'formik';
import { saveToolValidation } from './validations';
import { Spinner } from '../loadingSpinner';

export const SaveToolModal: React.FunctionComponent<IPropsSaveToll> = function({ visible, manageVisibilitySaveToolModal, reloadTools }) {
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [initialFormikValues] = useState({
        title: '',
        link: '',
        description: '',
        tags: ''
    })

    const toolService: ToolService = new ToolService();

    /**
     * @description Closes the modal
     */
    const closeModal = function(): void {
        manageVisibilitySaveToolModal(false);
    }

    /**
     * @description When the data is correct, saves the new tool on submit 
     * @param {IToolData} tool
     */
    const handleSubmit = function(tool: IToolData): void {
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
                {loadingSubmit && <Spinner style={SpinnerStyle} />}
                <h1>+ Add tool</h1>
                <Formik initialValues={initialFormikValues} onSubmit={handleSubmit} validationSchema={saveToolValidation}>
                    {({ handleChange, handleSubmit, values, errors }) => (
                        <StyledFormBox onSubmit={handleSubmit}>
                            <div>
                                <p>Tool Name *</p>
                                <StyledTextInput 
                                    type="text" 
                                    invalid={errors.title} 
                                    disable={loadingSubmit} 
                                    name="title" 
                                    onChange={handleChange} 
                                    value={values.title} 
                                    style={{ width: '100%' }} />
                                <StyledErrorMessage name="title" component="p" />
                            </div>
                            <div>
                                <p>Tool Link *</p>
                                <StyledTextInput 
                                    type="text" 
                                    invalid={errors.link} 
                                    disable={loadingSubmit} 
                                    name="link" 
                                    onChange={handleChange} 
                                    value={values.link} 
                                    style={{ width: '100%' }} />
                                <StyledErrorMessage name="link" component="p" />
                            </div>
                            <div>
                                <p>Tool description *</p>
                                <StyledTextArea 
                                    rows={3} 
                                    invalid={errors.description} 
                                    disable={loadingSubmit} 
                                    name="description" 
                                    onChange={handleChange} 
                                    value={values.description} 
                                    style={{ width: '100%', resize: 'none' }} />
                                <StyledErrorMessage name="description" component="p" />
                            </div>
                            <div>
                                <p>Tags * <StyledDescription>(for different tags, add a space. exp.: tag1 tag2 tag3)</StyledDescription></p>
                                <StyledTextInput 
                                    type="text" 
                                    invalid={errors.tags} 
                                    disable={loadingSubmit} 
                                    name="tags" 
                                    onChange={handleChange} 
                                    value={values.tags} 
                                    style={{ width: '100%' }} />
                                <StyledErrorMessage name="tags" component="p" />
                            </div>
                            <div className="button-box">
                                <DangerButton 
                                    type="button" 
                                    disable={loadingSubmit} 
                                    onClick={() => closeModal()}
                                >
                                    Cancel
                                </DangerButton>
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
