import axios from 'axios';

export async function checkBlogStatus(): Promise<{ status: string; color: string }> {
    const URL = 'https://adolfovillalobos.github.io/website/';
    try {
        const response = await axios.get(URL);
        
        return {
            status: response.status === 200 ? 'Online' : 'Offline',
            color: response.status === 200 ? 'green' : 'red',
        };
    } catch (error) {
        return {
            status: 'Offline',
            color: 'red',
        };
    }
}
