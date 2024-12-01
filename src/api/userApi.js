import {TOKEN_KEY, BASE_URL} from '@env';
import axios from 'axios';


const url = BASE_URL;
const authToken = TOKEN_KEY

export const loginApi = async (emailId, password) => {
    try {
        const response = await axios.post(`${url}/user/loginUser`, {
            emailId, password
        },
    {
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    }
    );
    return response.data;
    } catch (error) {
        // console.log("Error in loging request", error);
        return error;
        // throw error;
    }
};

