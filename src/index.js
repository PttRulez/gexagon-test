import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import ContextProvider from './context/ContextProvider';

import Register from './pages/Register';
import Login from './pages/Login';
import LinksTable from './pages/LinksTable';
import CreateLink from './pages/CreateLink';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ContextProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<LinksTable />} />
          <Route path='/my-links' element={<LinksTable />} />
          <Route path='/create-link' element={<CreateLink />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  </React.StrictMode>
);
