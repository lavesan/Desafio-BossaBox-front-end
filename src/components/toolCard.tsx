import React from 'react';
import { DangerButton, SuccessButton } from '../components/buttonComponent';
import styled from 'styled-components';
// @ts-ignore
import Modal from 'react-awesome-modal';
import { ToolService } from '../services/tool.service'

const StyledModalBody = styled.div`
    padding: 20px;
    display: flex;
    flex-flow: column nowrap;
    .button-box {
        display: flex;
        justify-content: flex-end;
        align-item: center;
        margin-top: 20px;
        button:not(:last-child) {
            margin-right: 10px;
        }
    }
`

const StyledCard = styled.section`
    display: flex;
    flex-flow: column nowrap;
    margin-top: 20px;
    border-radius: 2px;
    box-shadow: 3px 3px 8px #EBEAED;
    border: thin solid #EBEAED;
    padding: 20px;
    .header-box {
        display: flex;
        flex-flow: row nowrap;
        h3 {
            font-size: 1.5rem;
            display: inline-block;
            margin: 0;
        }
        div {
            display: flex;
            justify-content: flex-end;
            flex: 1;
        }
    }
`

export type TypeTool = {
    description: string;
    id: number;
    title: string;
    tags: string[];
}

export class ToolCard extends React.Component {

    props = {
        tool: {
            description: '',
            id: -1,
            title: '',
            tags: ['']
        },
    }

    
    state = {
        confirmModal: false
    }
    
    constructor(props: { tool: TypeTool }) {
        super(props);
        this.state = {
            confirmModal: false
        } 
    }

    showModal = () => {
        this.setState({ confirmModal: true })
    }
    
    closeModal = () => {
        this.setState({ confirmModal: false })
    }
    
    removeService = () => {
        this.setState({ confirmModal: false });
        ToolService.prototype.deleteTool(this.props.tool.id).then(res => {
            console.log(res);
        });
    }

    render() {
        return (
            <StyledCard>
                <div className="header-box">
                    <h3><u>{this.props.tool.title}</u></h3>
                    <div>
                        <DangerButton value={this.props.tool.id} onClick={this.showModal}>X remove</DangerButton>
                    </div>
                </div>
                <p>{this.props.tool.description}</p>
                <strong>{this.props.tool.tags.map(tag => `#${tag} `)}</strong>
                <Modal visible={this.state.confirmModal} width="450" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <StyledModalBody>
                        <h1>X Remove tool</h1>
                        <p>Are you sure you want to remove <strong>{this.props.tool.title}</strong>?</p>
                        <div className="button-box">
                            <SuccessButton>Deletar</SuccessButton>
                            <DangerButton onClick={() => this.closeModal()}>Voltar</DangerButton>
                        </div>
                    </StyledModalBody>
                </Modal>
            </StyledCard>
        )
    }
}