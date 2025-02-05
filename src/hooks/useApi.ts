// src/hooks/useApi.ts
import { useState } from 'react';
import Realm from 'realm';
import { AuthSchema } from '../context/AuthContext';
import { getAxiosInstance, updateToken } from '../services/api';
import { AxiosError } from 'axios';
import { loginResponse } from '../assets/Mock';
import { getRealm } from '../config/realm';

interface ApiResponse<T> {
    data: T | null;
    error: string | null;
    loading: boolean;
}

export const useApi = () => {
    const [loading, setLoading] = useState(false);

    const loginApi = async (credentials: { email: string; password: string }): Promise<ApiResponse<any>> => {
        try {
            setLoading(true);
            const api = getAxiosInstance();
            // const response = await api.post('', credentials);
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Use mock data instead of API call
            const response = { data: loginResponse };
            console.log('response: ', JSON.stringify(response));
            // Update axios instance with new token
            updateToken(response.data.accessToken);

            // Store in Realm
            const realm = await getRealm();

            realm.write(() => {
                realm.deleteAll();
                realm.create('Auth', {
                    id: '1',
                    userProfile: response.data.userProfile,
                    accessToken: response.data.accessToken,
                    refreshToken: response.data.refreshToken,
                    tokenExpiry: response.data.accessTokenExpiry,
                    accessTokenExpiry: response.data.accessTokenExpiry,
                    refreshTokenExpiry: response.data.refreshTokenExpiry
                });
            });

            realm.close();

            return {
                data: response.data,
                error: null,
                loading: false,
            };
        } catch (error) {
            let errorMessage = 'Login failed';
            if (error instanceof AxiosError) {
                errorMessage = error.response?.data?.message || error.message;
            }
            return {
                data: null,
                error: errorMessage,
                loading: false,
            };
        } finally {
            setLoading(false);
        }
    };

    const refreshTokenApi = async (refreshToken: string): Promise<ApiResponse<any>> => {
        try {
            setLoading(true);
            const api = getAxiosInstance();
            const response = await api.post('/refresh', { refreshToken });

            updateToken(response.data.accessToken);

            const realm = await Realm.open({
                schema: [AuthSchema],
            });

            realm.write(() => {
                const authData = realm.objects('Auth')[0];
                if (authData) {
                    authData.authToken = response.data.authToken;
                    authData.refreshToken = response.data.refreshToken;
                    authData.tokenExpiry = response.data.tokenExpiry;
                }
            });

            realm.close();

            return {
                data: response.data,
                error: null,
                loading: false,
            };
        } catch (error) {
            let errorMessage = 'Token refresh failed';
            if (error instanceof AxiosError) {
                errorMessage = error.response?.data?.message || error.message;
            }
            return {
                data: null,
                error: errorMessage,
                loading: false,
            };
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        loginApi,
        refreshTokenApi,
    };
};