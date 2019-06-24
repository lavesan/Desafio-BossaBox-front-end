export interface IPropsDeleteModal {
    visible: boolean,
    removeModalInfo: {
        id: number,
        title: string,
    } 
    manageVisibilityRemoveToolModal: (visible: boolean) => void,
    reloadTools: () => void
}

export interface IPropsSaveToll {
    visible: boolean, 
    manageVisibilitySaveToolModal: (visible: boolean) => void,
    reloadTools: () => void
}