import axios from 'axios';
import { API_URL } from '../envs/env';
import { IToolData } from '../pages/home/interfaces'

export class ToolService {
    /**
     * @description Get all tools on database.
     */
    async getAllTools(): Promise<any> {
        return axios.get(`${API_URL}tools`)
            .then(res => res.data)
    }

    /**
     * @description Search tools by some value
     * @param {string} value Value to filter tools
     * @param {boolean} onlyTag true when it's to search for only tags
     */
    async searchTool(value: string, onlyTag: boolean): Promise<any> {
        const params = onlyTag ? { tags_like: value } : { q: value };
        return axios.get(`${API_URL}tools`, { params })
            .then(res => res.data)
    }

    /**
     * @description Save a new tool
     * @param {IToolData} tool New tool to save
     */
    async saveTool(tool: IToolData): Promise<any> {
        return axios.post(`${API_URL}tools`, tool)
            .then(res => res)
    }

    /**
     * @description Deletes a tool by id
     * @param {number} id
     */
    async deleteTool(id: number): Promise<any> {
        return axios.delete(`${API_URL}tools/${id}`)
            .then(res => res, err => err)
    }
}