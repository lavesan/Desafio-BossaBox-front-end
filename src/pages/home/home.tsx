import React from 'react';
import { ToolService } from '../../services/tool.service';
import { SuccessButton } from '../../components/buttons/styles';
import { StyledTextInput } from '../../components/inputs/inputComponents';
import { ToolCard } from '../../components/card/toolCard';
import { SaveToolModal } from '../../components/modals/saveToll';
import { DeleteToolModal } from '../../components/modals/deleteTool';
import { StyledHomePage, StyledActionsBox } from './styles';
import { ToolContext } from './context';

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
        visibilityRemoveToolModal: false,
        visibilitySaveToolModal: false,
        reloadTools: true,
        removeModalInfo: { id: -1, title: '' }
    };

    manageVisibilityRemoveToolModal = (visible: boolean, modalInfo?: { id: number, title: string }): void => {
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
                        <SuccessButton onClick={() => this.manageVisibilitySaveToolModal(true)}>+ Add</SuccessButton>
                    </div>
                </StyledActionsBox>
                {tools.map(tool =>
                        tool.title ? <ToolCard key={tool.id} tool={tool} manageVisibilityRemoveToolModal={this.manageVisibilityRemoveToolModal} /> : <p>No tools found</p>)
                }
                <SaveToolModal manageVisibilitySaveToolModal={this.manageVisibilitySaveToolModal} visible={visibilitySaveToolModal} 
                    initialValues={initialValues} reloadTools={this.reloadTools} />
                <DeleteToolModal manageVisibilityRemoveToolModal={this.manageVisibilityRemoveToolModal} visible={visibilityRemoveToolModal} 
                    id={removeModalInfo.id} title={removeModalInfo.title} reloadTools={this.reloadTools} />
            </StyledHomePage>
        )
    }
}