import {TOKEN_KEY, BASE_URL} from '@env';
import axios from 'axios';
import apiClient from '../utility/ApiClient';

export const loginApi = async (emailId, password) => {
    try {
        const response = await apiClient.post('/user/loginUser', {emailId, password});
        return response.data;
    } catch (error) {
        // console.log("Error in loging request", error);
        // throw error;
        return error;
    }
};

