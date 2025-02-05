import React, { createContext, useContext, useState, useEffect } from 'react';
import Realm from 'realm';
import { Alert } from 'react-native';
import { useApi } from '../hooks/useApi';
import { getRealm } from '../config/realm';

export const AuthSchema = {
    name: "Auth",
    primaryKey: "id",
    properties: {
        id: "string",
        userProfile: "mixed?",
        accessToken: "string?",
        refreshToken: "string?",
        tokenExpiry: "int?",
    },
};
interface UserWithAccess {
    email: string;
    access: number[];
}

interface UserProfile {
    fullName: string;
    phoneNumber: string;
    email: string;
    role: string;
    profileImage: string;
    access: number[];
    userWithAccess: UserWithAccess[];
}

interface AuthState {
  userProfile: UserProfile | null;
  accessToken: string | null;
  refreshToken: string | null;
  tokenExpiry: number | null;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (profile: UserProfile) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { loginApi, refreshTokenApi } = useApi();
    const [authState, setAuthState] = useState<AuthState>({
        userProfile: null,
        accessToken: null,
        refreshToken: null,
        tokenExpiry: null,
        isLoading: true,
    });

    const loadStoredAuthState = async () => {
        try {
            const realm = await getRealm();

            const authData = (realm.objects('Auth')[0]);
            if (authData) {
                setAuthState({
                    userProfile: authData.userProfile as UserProfile | null,
                    accessToken: authData.accessToken as string | null,
                    refreshToken: authData.refreshToken as string | null,
                    tokenExpiry: authData.tokenExpiry as number | null,
                    isLoading: false,
                });
            } else {
                setAuthState(prev => ({ ...prev, isLoading: false }));
            }
            realm.close();
        } catch (error) {
            console.error('Error loading auth state:', error);
            setAuthState(prev => ({ ...prev, isLoading: false }));
        }
    };

    // Add refresh token interval
    useEffect(() => {
        if (authState.accessToken && authState.tokenExpiry) {
            const refreshInterval = setInterval(() => {
                const currentTime = Date.now();
                if (authState.tokenExpiry && currentTime >= authState.tokenExpiry - 60000) {
                    // refreshAuthToken();
                }
            }, 60000); // Check every minute

            return () => clearInterval(refreshInterval);
        }
    }, [authState.accessToken, authState.tokenExpiry]);

    const refreshAuthToken = async () => {
        if (!authState.refreshToken) {
            await logout();
            return;
        }

        try {
            const response = await refreshTokenApi(authState.refreshToken);
            if (response.error) throw new Error(response.error);
// should be from realm to make the state
            setAuthState(prev => ({
                ...prev,
                authToken: response.data.authToken,
                refreshToken: response.data.refreshToken,
                tokenExpiry: response.data.tokenExpiry,
            }));
        } catch (error) {
            await logout();
        }
    };

    const login = async (credentials: { email: string; password: string }) => {
        try {
            console.log('in login');
            const response = await loginApi(credentials);
            console.log('resp: ', JSON.stringify(response));
            if (response.error) throw new Error(response.error);

            setAuthState({
                userProfile: response.data.userProfile,
                accessToken: response.data.accessToken,
                refreshToken: response.data.refreshToken,
                tokenExpiry: response.data.tokenExpiry,
                isLoading: false,
            });
        } catch (error) {
            Alert.alert('Error', error instanceof Error ? error.message : 'Login failed');
            throw error;
        }
    };

    const logout = async () => {
        try {
            const realm = await Realm.open({
                schema: [AuthSchema],
            });

            realm.write(() => {
                realm.deleteAll();
            });

            realm.close();

            setAuthState({
                userProfile: null,
                accessToken: null,
                refreshToken: null,
                tokenExpiry: null,
                isLoading: false,
            });
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        }
    };

    const updateProfile = async (profile: UserProfile) => {
        try {
            const realm = await Realm.open({
                schema: [AuthSchema],
            });

            realm.write(() => {
                const authData = realm.objects('Auth')[0];
                if (authData) {
                    authData.userProfile = profile;
                }
            });

            realm.close();

            setAuthState(prev => ({
                ...prev,
                userProfile: profile,
            }));
        } catch (error) {
            console.error('Update profile error:', error);
            throw error;
        }
    };

    // Keep existing useEffect and return statement
    useEffect(() => {
        loadStoredAuthState();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                ...authState,
                login,
                logout,
                updateProfile,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};