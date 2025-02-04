import { useState } from 'react';
import {loginResponse} from '../assets/Mock/';
import Realm from 'realm';
import { AuthSchema } from '../context/AuthContext';
import { refreshTokenResponse } from '../assets/Mock';

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
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Use mock data
      const response = loginResponse;

      // Store in Realm
      const realm = await Realm.open({
        schema: [AuthSchema],
      });

      realm.write(() => {
        realm.deleteAll();
        realm.create('Auth', {
          id: '1',
          userProfile: response.userProfile,
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
          tokenExpiry: response.accessTokenExpiry,
          accessTokenExpiry: response.accessTokenExpiry,
          refreshTokenExpiry: response.refreshTokenExpiry
        });
      });

      realm.close();

      return {
        data: response,
        error: null,
        loading: false,
      };
    } catch (error) {
      return {
        data: null,
        error: 'Login failed',
        loading: false,
      };
    } finally {
      setLoading(false);
    }
  };

  const refreshTokenApi = async (refreshToken: string): Promise<ApiResponse<any>> => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));

      const response = refreshTokenResponse;

      const realm = await Realm.open({
        schema: [AuthSchema],
      });

      realm.write(() => {
        const authData = realm.objects('Auth')[0];
        if (authData) {
          authData.authToken = response.authToken;
          authData.refreshToken = response.refreshToken;
          authData.tokenExpiry = response.tokenExpiry;
        }
      });

      realm.close();

      return {
        data: response,
        error: null,
        loading: false,
      };
    } catch (error) {
      return {
        data: null,
        error: 'Token refresh failed',
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