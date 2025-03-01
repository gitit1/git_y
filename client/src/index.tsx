import React from 'react';
import ReactDOM from 'react-dom/client';

import { ThemeProvider, CssBaseline } from '@mui/material';

import App from './App';
import theme from 'style/theme';
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);