import axios from 'axios';

export class ToolService {
    async getAllTools(): Promise<any> {
        return axios.get('http://localhost:3000/tools')
            .then(res => res.data)
    }

    async searchTool(value: string, onlyTag: boolean): Promise<any> {
        const params = onlyTag ? { tags_like: value } : { q: value };
        return axios.get(`http://localhost:3000/tools`, { params })
            .then(res => res.data)
    }

    async saveTool(tool: any): Promise<any> {
        return axios.post('http://localhost:3000/tools', tool)
            .then(res => res)
    }

    async deleteTool(id: number): Promise<any> {
        return axios.delete(`http://localhost:3000/tools/${id}`)
            .then(res => res, err => err)
    }
}