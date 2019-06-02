import React from 'react';
import { DangerButton } from '../components/buttonComponent';
import styled from 'styled-components';

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
    }

    showModal() {
        this.setState({ confirmModal: true })
    }

    render() {
        return (
            <StyledCard>
                <div className="header-box">
                    <h3><a href="#">{this.props.tool.title}</a></h3>
                    <div>
                        <DangerButton value={this.props.tool.id} onClick={this.showModal}>X remove</DangerButton>
                    </div>
                </div>
                <p>{this.props.tool.description}</p>
                <strong>{this.props.tool.tags.map(tag => `${tag} `)}</strong>
            </StyledCard>
        )
    }
}