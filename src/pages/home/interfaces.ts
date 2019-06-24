export interface ISearchTools {
    onlyTags: boolean, 
    searchInput: string
}

export interface IToolData {
    description: string;
    title: string;
    link: string;
    tags: any;
}

export interface IToolInfo {
    id: number;
    description: string;
    title: string;
    link: string;
    tags: string[];
}

export interface IRemoveData{ 
    id: number, 
    title: string 
}