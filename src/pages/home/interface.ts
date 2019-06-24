export interface ISearchTools {
    onlyTags: boolean, 
    searchInput: string
}

export interface IToolInfo {
    description: string;
    id: number;
    title: string;
    link: string;
    tags: string[];
}

export interface IRemoveData{ 
    id: number, 
    title: string 
}