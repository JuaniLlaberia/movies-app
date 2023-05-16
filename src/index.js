import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { FavoriteProvider } from './context/FavoriteContext';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <FavoriteProvider>
        <ThemeProvider>
            <React.StrictMode>
              <App />
            </React.StrictMode>
        </ThemeProvider>
      </FavoriteProvider>
    </AuthProvider>
  </BrowserRouter>
);
