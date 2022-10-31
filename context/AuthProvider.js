import React, { useState } from 'react';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    let config = {
        user,
        setUser,
        login: (email, password) => {
            //fire call to server to login
            setUser(email);
        },
        logout: () => {
            //fire call to server to login
            setUser(null);
        },
    };
    return (
        <AuthContext.Provider value={config}>{children}</AuthContext.Provider>
    );
};
