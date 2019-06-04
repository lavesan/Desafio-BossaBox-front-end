import React from 'react';

export const ToolContext = React.createContext({
    manageVisibilityRemoveToolModal: (visible: boolean) => {},
    manageVisibilitySaveToolModal: (visible: boolean) => {},
    reloadTools: () => {},
})