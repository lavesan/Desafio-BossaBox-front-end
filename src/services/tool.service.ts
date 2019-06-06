import axios from 'axios';
import { API_URL } from '../env/env'

export class ToolService {
    async getAllTools(): Promise<any> {
        return axios.get(`${API_URL}tools`)
            .then(res => res.data)
    }

    async searchTool(value: string, onlyTag: boolean): Promise<any> {
        const params = onlyTag ? { tags_like: value } : { q: value };
        return axios.get(`${API_URL}tools`, { params })
            .then(res => res.data)
    }

    async saveTool(tool: any): Promise<any> {
        return axios.post(`${API_URL}tools`, tool)
            .then(res => res)
    }

    async deleteTool(id: number): Promise<any> {
        return axios.delete(`${API_URL}tools/${id}`)
            .then(res => res, err => err)
    }
}