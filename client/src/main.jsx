import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'


import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import './index.css'

import {CssBaseline} from '@mui/material'
import {SnackbarProvider} from 'notistack';

//debemos envolver la app con snackbar provider
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <SnackbarProvider>
      <CssBaseline/>
      <App/>
   </SnackbarProvider>
  </React.StrictMode>,
)
