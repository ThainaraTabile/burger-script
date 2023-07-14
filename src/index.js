import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRoutes from './Rotas';
import { ModalProvider } from './contextos/ModalContext';
import { BrowserRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ModalProvider>
        <AppRoutes />
      </ModalProvider>
    </BrowserRouter>
  </React.StrictMode>
);
