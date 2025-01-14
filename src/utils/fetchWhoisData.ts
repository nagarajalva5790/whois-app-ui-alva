import axios from 'axios';

const API_URL = 'https://whois-api-q7ys.onrender.com/api/lookup';

export const fetchWhoisData = async (query: string) => {
    try {
        const response = await axios.post(API_URL, { query });
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Failed to fetch data');
        } else {
            throw new Error('Failed to fetch data');
        }
    }
};
