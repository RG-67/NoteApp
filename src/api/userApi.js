import {TOKEN_KEY, BASE_URL} from '@env';
import axios from 'axios';
import apiClient from '../utility/ApiClient';


export const registerApi = async (name, phoneNumber, emailId, password) => {
    try {
        const response = await apiClient.post('/user/createUser', {name, phoneNumber, emailId, password});
        console.log("registerApiRes", response.data);
        return response.data;
    } catch (error) {
        console.log("registerApiErrRes", error);
        return error;
    }
}

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

