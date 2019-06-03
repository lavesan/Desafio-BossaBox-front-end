import React from 'react';
import { ToolService } from '../services/tool.service';
import { SuccessButton } from '../components/buttonComponent';
import { StyledTextInput } from '../components/inputComponents';
import { ToolCard } from '../components/toolCard';
import { SaveToolModal } from '../components/modals/saveToll';
import { DeleteToolModal } from '../components/modals/deleteTool';
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

const ToolContext = React.createContext({
    manageVisibilityRemoveToolModal: (visible: boolean) => {},
    manageVisibilitySaveToolModal: (visible: boolean) => {},
    reloadTools: () => {},
})

export class HomePage extends React.Component {

    state = {
        tools: [{
            description: '',
            id: -1,
            link: '',
            title: '',
            tags: ['']
        }],
        visibilityRemoveToolModal: false,
        visibilitySaveToolModal: false,
        reloadTools: true,
        removeModalInfo: { id: -1, title: '' }
    };

    manageVisibilityRemoveToolModal = (visible: boolean, modalInfo?: { id: number, title: string }): void => {
        console.log('modalInfo: ', modalInfo)
        if (modalInfo) {
            this.setState({ removeModalInfo: modalInfo })
        }
        this.setState({ visibilityRemoveToolModal: visible })
    }

    manageVisibilitySaveToolModal = (visible: boolean): void => {
        this.setState({ visibilitySaveToolModal: visible })
    }
    
    reloadTools = (): void => {
        this.setState({ reloadTools: true })
        ToolService.prototype.getAllTools().then(res => {
            this.setState({ reloadTools: false, tools: res })
        })
    }
    
    componentDidMount() {
        this.reloadTools();
    }
    
    render() {
        const { tools, visibilityRemoveToolModal, visibilitySaveToolModal, removeModalInfo } = this.state;

        const initialValues = {
            title: '',
            link: '',
            description: '',
            tags: ''
        }

        const value = {
            manageVisibilityRemoveToolModal: this.manageVisibilityRemoveToolModal,
            manageVisibilitySaveToolModal: this.manageVisibilitySaveToolModal,
            reloadTools: this.reloadTools
        }

        return (
            <ToolContext.Provider value={value}>
                <ToolContext.Consumer>
                        {({ manageVisibilityRemoveToolModal, manageVisibilitySaveToolModal, reloadTools }) => (
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
                                        <SuccessButton onClick={() => manageVisibilitySaveToolModal(true)}>+ Add</SuccessButton>
                                    </div>
                                </StyledActionsBox>
                                {tools.map(tool => 
                                        tool.title ? <ToolCard key={tool.id} tool={tool} manageVisibilityRemoveToolModal={manageVisibilityRemoveToolModal} /> : <p>No tools found</p>)
                                }
                                <SaveToolModal manageVisibilitySaveToolModal={manageVisibilitySaveToolModal} visible={visibilitySaveToolModal} 
                                    initialValues={initialValues} reloadTools={reloadTools} />
                                <DeleteToolModal manageVisibilityRemoveToolModal={manageVisibilityRemoveToolModal} visible={visibilityRemoveToolModal} 
                                    id={removeModalInfo.id} title={removeModalInfo.title} reloadTools={reloadTools} />
                            </StyledHomePage>
                        )}
                </ToolContext.Consumer>
            </ToolContext.Provider>
        )
    }
}