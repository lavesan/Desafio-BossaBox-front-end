import React from 'react';
import { DangerButton } from '../buttons';
import { StyledCard } from './styles';

export type TypeTool = {
    description: string;
    id: number;
    title: string;
    link: string;
    tags: string[];
}

interface IPropsToolCard {
    tool: TypeTool;
    manageVisibilityRemoveToolModal: (visible: boolean, modalInfo?: { id: number, title: string }) => void;
}

export const ToolCard: React.FunctionComponent<IPropsToolCard> = function({ tool, manageVisibilityRemoveToolModal }) {
    return (
        <StyledCard>
            <div className="header-box">
                <h3><a href={tool.link} target="_blank" rel="noopener noreferrer">{tool.title}</a></h3>
                <div>
                    <DangerButton onClick={() => manageVisibilityRemoveToolModal(true, { id: tool.id, title: tool.title })
                    }>X remove</DangerButton>
                </div>
            </div>
            <p>{tool.description}</p>
            <strong>{tool.tags.map(tag => `#${tag} `)}</strong>
        </StyledCard>
    )
}