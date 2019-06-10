import React, { useEffect, useState } from 'react';
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

interface ISearchTools {
    onlyTags: boolean, 
    searchInput: string
}

interface IToolInfo {
    description: string;
    id: number;
    title: string;
    link: string;
    tags: string[];
}

// export const HomePage = function() {
//     let tools: IToolInfo[] = [];
//     let searchToolsConf: ISearchTools;
//     let visibilityRemoveToolModal: boolean = false;
//     let visibilitySaveToolModal: boolean = false;
//     let removeModalInfo: { id: number, title: string } = { id: -1, title: '' };
//     let loadingTools: boolean = false

//     const toolService: ToolService = new ToolService();

//     const emptyToolsMessage: string = 'No tools found';

//     const manageVisibilityRemoveToolModal = (visible: boolean, modalInfo?: { id: number, title: string }): void => {
//         if (modalInfo)
//             removeModalInfo = modalInfo;
//         visibilityRemoveToolModal = visible;
//     }
    
//     const manageVisibilitySaveToolModal = (visible: boolean): void => {
//         visibilitySaveToolModal = visible;
//     }

//     const onChangeTagsOnly = (element: any) => {
//         const { target: { checked } } = element;

//         searchToolsConf.onlyTags = checked;
//         searchTools();
//     }
    
//     const onSearchKeyUp = (element: any) => {
//         const { target: { value } } = element;

//         searchToolsConf.searchInput = value;
//         searchTools();
//     }

//     const searchTools = async () => {
//         const { searchInput, onlyTags } = searchToolsConf;

//         await toolService.searchTool(searchInput, onlyTags)
//             .then(res =>  {
//                 loadingTools = false;
//                 tools = res;
//             })
//             .catch(err => {
//                 loadingTools = false;
//                 tools = [];
//             } 
//             );
//     }
    
//     const reloadTools = async () => {
//         loadingTools = true;
//         await toolService.getAllTools().then(res => {
//             loadingTools = false;
//             tools = res;
//             console.log('tools true: ', tools);
//         }).catch(err => {
//             loadingTools = false;
//             tools = [];
//             console.log('tools false: ', tools);
//         })
//     }

//     useEffect(() => {
//         reloadTools();
//         console.log('entrando');
//     }, [])

//     return (
//         <React.Fragment>
//             <StyledHomePage>
//                 <h1>VUTTR</h1>
//                 <h2>Very Useful Tools to Remember</h2>
//                     <StyledActionsBox>
//                         <StyledSearchIcon icon={faSearch} />
//                         <StyledHomeSearchInput type="text" placeholder="search" onKeyUp={onSearchKeyUp} />
//                         <StyledCheckbox>
//                             <input id="search" type="checkbox" onChange={onChangeTagsOnly} />
//                             <label htmlFor="search">Search in tags only</label>
//                         </StyledCheckbox>
//                         <div style={box}>
//                             <SuccessButton type="button" onClick={() => manageVisibilitySaveToolModal(true)}>+ Add</SuccessButton>
//                         </div>
//                     </StyledActionsBox>
//                 {tools.map(tool =>
//                         tool.title ? <ToolCard key={tool.id} tool={tool} manageVisibilityRemoveToolModal={manageVisibilityRemoveToolModal} /> : <p>{emptyToolsMessage}</p>)
//                 }
//             </StyledHomePage>
//             <SaveToolModal manageVisibilitySaveToolModal={manageVisibilitySaveToolModal} visible={visibilitySaveToolModal} 
//                 reloadTools={reloadTools} />
//             <DeleteToolModal manageVisibilityRemoveToolModal={manageVisibilityRemoveToolModal} visible={visibilityRemoveToolModal} 
//                 removeModalInfo={removeModalInfo} reloadTools={reloadTools} />
//         </React.Fragment>
//     )
// }

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
            <React.Fragment>
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
                </StyledHomePage>
                <SaveToolModal manageVisibilitySaveToolModal={this.manageVisibilitySaveToolModal} visible={visibilitySaveToolModal} 
                    reloadTools={this.reloadTools} />
                <DeleteToolModal manageVisibilityRemoveToolModal={this.manageVisibilityRemoveToolModal} visible={visibilityRemoveToolModal} 
                    removeModalInfo={removeModalInfo} reloadTools={this.reloadTools} />
            </React.Fragment>
        )
    }
}