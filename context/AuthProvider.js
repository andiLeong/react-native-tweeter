import React, { useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import loginViaAxios from '../hooks/loginViaAxios';
import axiosConfig from '../helper/axiosConfig';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    let config = {
        user,
        setUser,
        error,
        isLoading,
        login: (email, password) => {
            setIsLoading(true);
            loginViaAxios(
                `/api/login`,
                {
                    email,
                    password,
                    device_name: 'ios',
                },
                ({ data }) => {
                    let user = data;
                    console.log(user);
                    SecureStore.setItemAsync('user', JSON.stringify(user));
                    setUser(user);
                    setIsLoading(false);
                },
                err => {
                    console.log(err);
                    setError(err.response.data.message);
                    setIsLoading(false);
                }
            );
        },
        logout: () => {
            setIsLoading(true);
            axiosConfig.defaults.headers.common[
                'Authorization'
            ] = `Bearer ${user.token}`;

            axiosConfig
                .post('/api/logout')
                .then(response => {
                    console.log('log out success');
                    setUser(null);
                    SecureStore.deleteItemAsync('user');
                    setError(null);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.log(error);
                    setUser(null);
                    SecureStore.deleteItemAsync('user');
                    setError(error.response.data.message);
                    setIsLoading(false);
                });
        },
    };
    return (
        <AuthContext.Provider value={config}>{children}</AuthContext.Provider>
    );
};
