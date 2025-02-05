// src/services/api.ts
import axios, { AxiosInstance, AxiosResponse, AxiosError, CreateAxiosDefaults, RawAxiosRequestHeaders } from 'axios';

const BASE_URL = 'https://eecd-2001-8003-43c6-b400-3809-f049-3635-4a0a.ngrok-free.app';

let axiosInstance: AxiosInstance;

export const initializeApi = (token?: string) => {
    const config: CreateAxiosDefaults = {
        baseURL: BASE_URL,
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
        } as RawAxiosRequestHeaders
    };

    if (token) {
        config.headers = {
            ...config.headers,
            'Authorization': `Bearer ${token}`
        } as RawAxiosRequestHeaders;
    }

    axiosInstance = axios.create(config);

    axiosInstance.interceptors.response.use(
        (response: AxiosResponse) => response,
        (error: AxiosError) => {
            if (error.response?.status === 401) {
                // Handle unauthorized access
            }
            return Promise.reject(error);
        }
    );

    return axiosInstance;
};

export const getAxiosInstance = () => {
    if (!axiosInstance) {
        return initializeApi();
    }
    return axiosInstance;
};

export const updateToken = (token: string) => {
    if (axiosInstance) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
};