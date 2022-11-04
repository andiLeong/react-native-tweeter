import React, { useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import appAxios from '../helper/appAxios';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    function loginSuccess(user) {
        SecureStore.setItemAsync('user', JSON.stringify(user));
        setUser(user);
    }

    function logoutSuccess() {
        setUser(null);
        SecureStore.deleteItemAsync('user');
    }

    let config = {
        user,
        setUser,
        error,
        isLoading,
        loginSuccess,
        login: (email, password) => {
            appAxios
                .via('post')
                .to(`/api/login`)
                .setPayload({
                    email,
                    password,
                    device_name: 'ios',
                })
                .before(() => setIsLoading(true))
                .after(() => setIsLoading(false))
                .onSuccess(({ data }) => loginSuccess(data))
                .onFailure(err => setError(err.response.data.message))
                .fire();
        },
        logout: () => {
            appAxios
                .via('post')
                .to(`/api/logout`)
                .bearToken(user.token)
                .before(() => setIsLoading(true))
                .onSuccess(() => logoutSuccess())
                .onFailure(error => logoutSuccess())
                .after(() => setIsLoading(false))
                .fire();
        },
    };
    return (
        <AuthContext.Provider value={config}>{children}</AuthContext.Provider>
    );
};
