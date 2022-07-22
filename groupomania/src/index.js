import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import SignUp from './pages/SignUp/index'
import Login from './pages/Login/index'
import Home from './pages/Home/index'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<App />}/>
    <Route path="/SignUp" element={<SignUp />} />
    <Route path="/Login" element={<Login />} />
    <Route path="/Home" element={<Home />} />
  </Routes>
  </BrowserRouter>
);
