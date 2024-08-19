import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './components/context/AuthContext'
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <AuthProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </AuthProvider>
   
 
);

