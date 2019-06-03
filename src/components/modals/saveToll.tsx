import React from 'react';
import PropTypes from 'prop-types';
// @ts-ignore
import Modal from 'react-awesome-modal';
import { StyledModalBody } from '../toolCard';
import styled from 'styled-components';
import { SuccessButton, DangerButton } from '../buttonComponent';
import { StyledTextInput, StyledTextArea } from '../inputComponents';
import { Formik } from 'formik';
import { ToolService } from '../../services/tool.service'


const StyledFormBox = styled.form`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    div {
        width: 80%;
    }
`

// @ts-ignore
export class SaveToolModal extends React.Component {
     
    props: { initialValues: { title: string, link: string, description: string, tags: string }, visible: boolean }

    state = {
        visible: false
    }

    constructor(props: any) {
        super(props)
        this.props = props;
        this.state.visible = props.visible;
    }

    closeModal = (): void => {
        this.setState({ visible: false })
    }

    handleSubmit = (tool: any): void => {
        console.log(tool);
        let newTool = tool;
        newTool.tags = newTool.tags.split(' ');
        ToolService.prototype.saveTool(newTool).then(res => {
            this.closeModal();
            console.log(res);
        })
    }

    componentWillReceiveProps(newProps: any) {
        this.setState({ visible: newProps.visible })
    }

    render() {
        return (
            <Modal visible={this.state.visible} width="600" effect="fadeInUp" onClickAway={() => this.closeModal()}>
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
