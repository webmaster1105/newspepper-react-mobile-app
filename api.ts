import axios from 'axios';

export const get = async (url:string) => {
    try {
        const response = 
        	await axios.get(url);

            console.log("calling api", url)
        return response.data;
    } catch (error) {
        throw error;
    }
};