import { IToolInfo } from '../../pages/home/interfaces';

export interface IPropsToolCard {
    tool: IToolInfo;
    manageVisibilityRemoveToolModal: (visible: boolean, modalInfo?: { id: number, title: string }) => void;
}