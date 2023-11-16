import axios from 'axios';
import { Enviroment } from '../../../shared/enviroment';
import { errorInterceptor, responseInterceptor } from './interceptors';

export const Api = () => {
    const api = axios.create({
        baseURL: Enviroment.URL_BASE,
        headers: {
            authorization: `Bearer ${JSON.parse(localStorage.getItem('APP_ACCESS_TOKEN') || '""')}`
        }
    });

    api.interceptors.response.use(
        (response) => responseInterceptor(response),
        (error) => errorInterceptor(error),
    );

    return api;
};