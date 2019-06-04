import React from 'react';
import { DangerButton } from '../buttons/styles';
import { StyledCard, StyledModalBody } from './styles';

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