import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import axios from 'axios';
import {StoreProvider} from './store.jsx';

axios.defaults.baseURL = "http://localhost:8080";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StoreProvider>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </StoreProvider>
  </React.StrictMode>,
)
