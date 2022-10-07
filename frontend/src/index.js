import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthContextProvider } from './authContext/AuthContext';

ReactDOM.render(
    <React.StrictMode>
        <AuthContextProvider> {/* for authentication context */}
            <App />
        </AuthContextProvider>
    </React.StrictMode>,
    document.getElementById('root')
); 