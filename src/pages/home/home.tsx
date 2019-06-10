import React from 'react';
import { ToolService } from '../../services/tool.service';
import { SuccessButton } from '../../components/buttons/styles';
import { StyledCheckbox } from '../../components/inputs/styles';
import { ToolCard } from '../../components/card/toolCard';
import { SaveToolModal } from '../../components/modals/saveToll';
import { DeleteToolModal } from '../../components/modals/deleteTool';
import { StyledHomePage, StyledActionsBox, StyledSearchIcon, StyledHomeSearchInput } from './styles';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

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
        removeModalInfo: { id: -1, title: '' },
        searchTools: { onlyTags: false, searchInput: '' }
    };

    constructor(props: any, private toolService: ToolService) {
        super(props);
        this.toolService = new ToolService();
    }

    emptyToolsMessage: string = 'No tools found';

    manageVisibilityRemoveToolModal = (visible: boolean, modalInfo?: { id: number, title: string }): void => {
        if (modalInfo) {
            this.setState({ removeModalInfo: modalInfo })
        }
        this.setState({ visibilityRemoveToolModal: visible })
    }

    manageVisibilitySaveToolModal = (visible: boolean): void => {
        this.setState({ visibilitySaveToolModal: visible })
    }

    onChangeTagsOnly = (element: any) => {
        const { target: { checked } } = element;

        this.setState({ searchTools: { onlyTags: checked, searchInput: this.state.searchTools.searchInput } }, () => {
            this.searchTools();
        });
    }
    
    onSearchKeyUp = (element: any) => {
        const { target: { value } } = element;

        this.setState({ searchTools: { searchInput: value, onlyTags: this.state.searchTools.onlyTags } }, () => {
            this.searchTools();
        });
    }

    searchTools = () => {
        const { searchTools: { searchInput, onlyTags } } = this.state;

        this.toolService.searchTool(searchInput, onlyTags)
            .then(res =>  {
                this.setState({ reloadTools: false, tools: res })
            })
            .catch(err => console.log('err: ', err));
    }
    
    reloadTools = (): void => {
        this.setState({ reloadTools: true })
        this.toolService.getAllTools().then(res => {
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

        return (
            <StyledHomePage>
                <h1>VUTTR</h1>
                <h2>Very Useful Tools to Remember</h2>
                    <StyledActionsBox>
                        <StyledSearchIcon icon={faSearch} />
                        <StyledHomeSearchInput type="text" placeholder="search" onKeyUp={this.onSearchKeyUp} />
                        <StyledCheckbox>
                            <input id="search" type="checkbox" onChange={this.onChangeTagsOnly} />
                            <label htmlFor="search">Search in tags only</label>
                        </StyledCheckbox>
                        <div style={box}>
                            <SuccessButton type="button" onClick={() => this.manageVisibilitySaveToolModal(true)}>+ Add</SuccessButton>
                        </div>
                    </StyledActionsBox>
                {tools.map(tool =>
                        tool.title ? <ToolCard key={tool.id} tool={tool} manageVisibilityRemoveToolModal={this.manageVisibilityRemoveToolModal} /> : <p>{this.emptyToolsMessage}</p>)
                }
                <SaveToolModal manageVisibilitySaveToolModal={this.manageVisibilitySaveToolModal} visible={visibilitySaveToolModal} 
                    reloadTools={this.reloadTools} />
                <DeleteToolModal manageVisibilityRemoveToolModal={this.manageVisibilityRemoveToolModal} visible={visibilityRemoveToolModal} 
                    id={removeModalInfo.id} title={removeModalInfo.title} reloadTools={this.reloadTools} />
            </StyledHomePage>
        )
    }
}