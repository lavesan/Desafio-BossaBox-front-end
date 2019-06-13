import React, { useEffect, useState } from 'react';
import { ToolService } from '../../services/tool.service';
import { SuccessButton } from '../../components/buttons/styles';
import { StyledCheckbox } from '../../components/inputs/styles';
import { ToolCard } from '../../components/card/toolCard';
import { SaveToolModal } from '../../components/modals/saveToll';
import { DeleteToolModal } from '../../components/modals/deleteTool';
import { StyledHomePage, StyledActionsBox, StyledSearchIcon, StyledHomeSearchInput } from './styles';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Spinner } from '../../components/loadingSpinner/spinner'

const box = {
    display: 'flex',
    justifyContent: 'flex-end',
    flex: 1
}

const loadingHome = {
    position: 'sticky',
    left: '50%',
    top: '280px'
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

export const HomePage = function() {
    const [tools, setTools] = useState<IToolInfo[] | null>(null);
    const [searchToolsConf, setSearchToolsConf] = useState<ISearchTools>({ onlyTags: false, searchInput: '' });
    const [showDeleteToolModal, setShowDeleteToolModal] = useState<boolean>(false);
    const [showSaveToolModal, setShowSaveToolModal] = useState<boolean>(false);
    const [loadingTools, setLoadingTools] = useState<boolean>(false);
    let removeModalInfo: { id: number, title: string } = { id: -1, title: '' };

    const toolService: ToolService = new ToolService();

    let emptyToolsMessage: 'No tools found' | 'Server problem. Wait a moment and try again.' = 'No tools found';

    const manageVisibilityRemoveToolModal = (visible: boolean, modalInfo?: { id: number, title: string }): void => {
        if (modalInfo)
            removeModalInfo = modalInfo;
            setShowDeleteToolModal(visible);
    }
    
    const manageVisibilitySaveToolModal = (visible: boolean): void => {
        setShowSaveToolModal(visible);
    }

    const onChangeTagsOnly = (element: any) => {
        const { target: { checked } } = element;

        searchToolsConf.onlyTags = checked;
        searchTools();
    }
    
    const onSearchKeyUp = (element: any) => {
        const { target: { value } } = element;

        searchToolsConf.searchInput = value;
        searchTools();
    }

    const searchTools = async () => {
        const { searchInput, onlyTags } = searchToolsConf;

        setLoadingTools(true);
        await toolService.searchTool(searchInput, onlyTags)
            .then(res =>  {
                setLoadingTools(false);
                setTools(res);
                emptyToolsMessage = 'No tools found';
            })
            .catch(_ => {
                emptyToolsMessage = 'Server problem. Wait a moment and try again.';
                setLoadingTools(false);
                setTools(null);
            });
        }
        
    const reloadTools = async () => {
        setLoadingTools(true);
        await toolService.getAllTools()
            .then(res => {
                setLoadingTools(false);
                setTools(res)
                emptyToolsMessage = 'No tools found';
            }).catch(_ => {
                setLoadingTools(false);
                setTools(null)
                emptyToolsMessage = 'Server problem. Wait a moment and try again.';
            })
    }

    useEffect(() => {
        reloadTools();
        console.log('entrando');
    }, [])

    return (
        <React.Fragment>
            <StyledHomePage>
                <h1>VUTTR</h1>
                <h2>Very Useful Tools to Remember</h2>
                    <StyledActionsBox>
                        <StyledSearchIcon icon={faSearch} />
                        <StyledHomeSearchInput type="text" placeholder="search" onKeyUp={onSearchKeyUp} />
                        <StyledCheckbox>
                            <input id="search" type="checkbox" onChange={onChangeTagsOnly} />
                            <label htmlFor="search">Search in tags only</label>
                        </StyledCheckbox>
                        <div style={box}>
                            <SuccessButton type="button" onClick={() => manageVisibilitySaveToolModal(true)}>+ Add</SuccessButton>
                        </div>
                    </StyledActionsBox>
                {loadingTools && <Spinner style={loadingHome} />}
                {tools ? tools.map(tool =>
                        <ToolCard key={tool.id} tool={tool} manageVisibilityRemoveToolModal={manageVisibilityRemoveToolModal} />) : <p>{emptyToolsMessage}</p>
                }
            </StyledHomePage>
            <SaveToolModal manageVisibilitySaveToolModal={manageVisibilitySaveToolModal} visible={showSaveToolModal} 
                reloadTools={reloadTools} />
            <DeleteToolModal manageVisibilityRemoveToolModal={manageVisibilityRemoveToolModal} visible={showDeleteToolModal} 
                removeModalInfo={removeModalInfo} reloadTools={reloadTools} />
        </React.Fragment>
    )
}