import axios from 'axios';

export const get = async (url:string) => {
    
    try {
        console.log("calling api ", url)
        const response = 
        	await axios.get(url);

            console.log("API respond ", url)
        return response.data;
    } catch (error) {
        throw error;
    }
};