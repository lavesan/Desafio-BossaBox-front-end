import React from 'react';
import { DangerButton } from '../components/buttonComponent';
import { DeleteToolModal } from './modals/deleteTool'
import styled from 'styled-components';

export const StyledModalBody = styled.div`
    padding: 20px;
    display: flex;
    flex-flow: column nowrap;
    .button-box {
        display: flex;
        justify-content: flex-end;
        align-items: center;
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
    link: string;
    tags: string[];
}

export class ToolCard extends React.Component {

    props: { 
        tool: TypeTool, 
        manageVisibilityRemoveToolModal: (visible: boolean, modalInfo?: { id: number, title: string }) => void 
    }

    constructor(props: any) {
        super(props);
        this.props = props;
    }

    render() {
        
        const { tool: { title, id, link, description, tags }, manageVisibilityRemoveToolModal } = this.props;

        return (
            <StyledCard>
                <div className="header-box">
                    <h3><a href={link} target="_blank" rel="noopener noreferrer">{title}</a></h3>
                    <div>
                        <DangerButton onClick={() => this.props.manageVisibilityRemoveToolModal(true, { id, title })
                        }>X remove</DangerButton>
                    </div>
                </div>
                <p>{description}</p>
                <strong>{tags.map(tag => `#${tag} `)}</strong>
            </StyledCard>
        )
    }
}