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
    tags: string[];
}

export class ToolCard extends React.Component {

    props = {
        tool: {
            description: '',
            id: -1,
            title: '',
            link: '',
            tags: ['']
        },
    }    

    state = {
        reloadTools: false,
        showSaveToolModal: false, 
        showDeleteToolModal: false
    }
    
    constructor(props: { tool: TypeTool }) {
        super(props);
    }

    showModal = () => {
        this.setState({ showDeleteToolModal: true });
    }

    render() {
        
        const { tool: { title, id, link, description, tags } } = this.props;
        let { showDeleteToolModal } = this.state;

        return (
            <StyledCard>
                <div className="header-box">
                    <h3><a href={link}>{title}</a></h3>
                    <div>
                        <DangerButton value={id} onClick={() => this.showModal()}>X remove</DangerButton>
                    </div>
                </div>
                <p>{description}</p>
                <strong>{tags.map(tag => `#${tag} `)}</strong>
                <DeleteToolModal showDeleteToolModal={this.state.showDeleteToolModal} id={id} title={title} />
            </StyledCard>
        )
    }
}