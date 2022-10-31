import React from 'react';
import { AuthProvider } from './context/AuthProvider';
import Root from './Root';

function App(props) {
    return (
        <AuthProvider>
            <Root />
        </AuthProvider>
    );
}

export default App;
