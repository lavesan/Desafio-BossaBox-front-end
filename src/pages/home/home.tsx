import React, { useEffect, useState } from 'react';
import { ToolService } from '../../services';
import { SuccessButton } from '../../components/buttons';
import { StyledCheckbox } from '../../components/inputs';
import { ToolCard } from '../../components/card';
import { SaveToolModal } from '../../components/modals';
import { DeleteToolModal } from '../../components/modals';
import { StyledHomePage, StyledActionsBox, StyledSearchIcon, StyledHomeSearchInput, loadingHome, box } from './styles';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Spinner } from '../../components/loadingSpinner';
import { ISearchTools, IToolInfo, IRemoveData } from './interfaces';

export const HomePage = function() {
    const [tools, setTools] = useState<IToolInfo[] | null>(null);
    const [showDeleteToolModal, setShowDeleteToolModal] = useState<boolean>(false);
    const [showSaveToolModal, setShowSaveToolModal] = useState<boolean>(false);
    const [loadingTools, setLoadingTools] = useState<boolean>(false);
    const [removeModalInfo, setRemoveModalInfo] = useState<IRemoveData>({ id: -1, title: '' });
    const [emptyToolsMessage, setEmptyToolsMessage] = useState<'No tools found' | 'Server problem. Wait a moment and try again.'>('No tools found');
    
    const searchToolsConf: ISearchTools = { onlyTags: false, searchInput: '' };

    const toolService: ToolService = new ToolService();


    /**
     * @description Manages visibility of delete tool modal
     * @param {boolean} visible When true shows modal. false hides. 
     * @param {IRemoveData} modalInfo Loads id and title of tool on delete modal
     */
    const manageVisibilityRemoveToolModal = (visible: boolean, modalInfo?: IRemoveData): void => {
        if (modalInfo)
            setRemoveModalInfo(modalInfo);
        setShowDeleteToolModal(visible);
    }

    /**
     * @description Manages visibility of save tool modal
     * @param {boolean} visible When true shows modal. false hides.
     */
    const manageVisibilitySaveToolModal = (visible: boolean): void => {
        setShowSaveToolModal(visible);
    }

    /**
     * @description Manages checkbox 'tags only' attribute
     * @param element native element of input
     */
    const onChangeTagsOnly = (element: any) => {
        const { target: { checked } } = element;

        searchToolsConf.onlyTags = checked;
        searchTools();
    }
    
    /**
     * @description Search tools on input keyup
     * @param element native element of input
     */
    const onSearchKeyUp = (element: any) => {
        const { target: { value } } = element;

        searchToolsConf.searchInput = value;
        searchTools();
    }

    /**
     * @description Search tools on screen getting them filtered.
     */
    const searchTools = async () => {
        const { searchInput, onlyTags } = searchToolsConf;

        setLoadingTools(true);
        await toolService.searchTool(searchInput, onlyTags)
            .then(res =>  {
                setLoadingTools(false);
                setTools(res);
                setEmptyToolsMessage('No tools found');
            })
            .catch(_ => {
                setEmptyToolsMessage('Server problem. Wait a moment and try again.');
                setLoadingTools(false);
                setTools(null);
            });
    }
     
    /**
     * @description Reload tools on screen getting all.
     */
    const reloadTools = async () => {
        setLoadingTools(true);
        await toolService.getAllTools()
            .then(res => {
                setLoadingTools(false);
                setTools(res)
                setEmptyToolsMessage('No tools found');
            }).catch(_ => {
                setLoadingTools(false);
                setTools(null)
                setEmptyToolsMessage('Server problem. Wait a moment and try again.');
            })
    }

    /**
     * @description Triggered when page loads.
     */
    useEffect(() => {
        reloadTools();
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