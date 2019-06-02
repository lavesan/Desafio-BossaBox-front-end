import React from 'react';

import { ToolService } from '../services/tool.service';

import { SuccessButton } from '../components/buttonComponent';
import { StyledTextInput } from '../components/inputComponents';
import { ToolCard } from '../components/toolCard';
import styled from 'styled-components';
import { TypeTool } from '../components/toolCard'

const StyledHomePage = styled.div`
    margin: 0 auto;
    width: calc(100% - 500px);
    padding: 10px;
    font-family: Roboto;
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

interface ITools {
    tools: TypeTool[]
}

export class HomePage extends React.Component {

    state = {
        tools: [{
            description: '',
            id: -1,
            title: '',
            tags: ['']
        }]
    };

    componentDidMount() {
        ToolService.prototype.getAllTools().then(res => {
            this.setState({ tools: res });
        })
    }

    render() {
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
                        <SuccessButton>+ Add</SuccessButton>
                    </div>
                </StyledActionsBox>
                {this.state.tools.map(tool => <ToolCard key={tool.id} tool={tool} />)}
            </StyledHomePage>
        )
    }
}