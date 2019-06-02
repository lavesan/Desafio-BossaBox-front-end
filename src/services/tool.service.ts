import axios from 'axios';

export class ToolService {
    async getAllTools(): Promise<any> {
        return axios.get('http://localhost:3000/tools')
            .then(res => {
                return res.data;
        })
    }

    async searchTool(tag: string): Promise<any> {
        return axios.post('http://localhost:3000/tools')
            .then(res => {
                return res.data;
        })
    }

    async saveTool(tool: any): Promise<any> {
        return axios.post('http://localhost:3000/tools')
            .then(res => {
                return res.data;
        })
    }

    async deleteTool(id: number): Promise<any> {
        return axios.post('http://localhost:3000/tools')
            .then(res => {
                return res.data;
        })
    }
}