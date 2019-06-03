import React from 'react';
import { ToolService } from '../services/tool.service';
import { SuccessButton } from '../components/buttonComponent';
import { StyledTextInput } from '../components/inputComponents';
import { ToolCard } from '../components/toolCard';
import { SaveToolModal } from '../components/modals/saveToll';
import styled from 'styled-components';

const StyledHomePage = styled.div`
    margin: 0 auto;
    width: calc(100% - 500px);
    padding: 10px;
    color: ${props => props.theme.primaryFontColor};
    font-family: ${props => props.theme.bossaFontFamily};
`

const StyledActionsBox = styled.div`
    display: flex;
    align-items: center;
    flex-flow: row nowrap;
    user-select: none;
`

const box = {
    display: 'flex',
    justifyContent: 'flex-end',
    flex: 1
}

export class HomePage extends React.Component {

    state = {
        tools: [{
            description: '',
            id: -1,
            link: '',
            title: '',
            tags: ['']
        }],
        showNewToolModal: false
    };

    showSaveToolModal = () => {
        this.setState({ showNewToolModal: true })
    }

    componentDidMount() {
        ToolService.prototype.getAllTools().then(res => {
            this.setState({ tools: res });
        })
    }
    
    render() {
        const initialValues = {
            title: '',
            link: '',
            description: '',
            tags: ''
        }

        return (
            <StyledHomePage>
                <h1>VUTTR</h1>
                <h2>Very Useful Tools to Remember</h2>
                <StyledActionsBox>
                    <StyledTextInput type="text" placeholder="search" />
                    <div>
                        <input id="search" type="checkbox" />
                        <label htmlFor="search">Search in tags only</label>
                    </div>
                    <div style={box}>
                        <SuccessButton onClick={this.showSaveToolModal}>+ Add</SuccessButton>
                    </div>
                </StyledActionsBox>
                <SaveToolModal visible={this.state.showNewToolModal} initialValues={initialValues} />
                {this.state.tools.map(tool => 
                    tool.title ? <ToolCard key={tool.id} tool={tool} /> : <p>No tools found</p>)
                }
            </StyledHomePage>
        )
    }
}