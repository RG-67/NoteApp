import axios from "axios";
import {TOKEN_KEY, BASE_URL} from '@env';

const url = BASE_URL;
const authToken = TOKEN_KEY;

const apiClient = axios.create({
    baseURL: url,
    timeout: 10000
});

apiClient.interceptors.request.use(
    (config) => {
        // const authToken = localStorage.getItem('authToken');
        if(authToken) {
            config.headers['Authorization'] = `Bearer ${authToken}`
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export default apiClient;