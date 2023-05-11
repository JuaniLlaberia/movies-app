import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { FavoriteProvider } from './context/FavoriteContext';
import { ThemeProvider } from './context/ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ThemeProvider>
      <FavoriteProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </FavoriteProvider>
    </ThemeProvider>
  </BrowserRouter>
);
