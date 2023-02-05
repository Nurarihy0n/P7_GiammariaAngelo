import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import SignUp from './pages/SignUp/index'
import Login from './pages/Login/index'
import Home from './pages/Home/index'
import UpdatePost from './components/UpdatePost/index'
import Moderator from './pages/Moderator/index'
import PrivateRoute from './components/PrivateRoute';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<App />}/>
    <Route path="/SignUp" element={<SignUp />} />
    <Route path="/Login" element={<Login />} />

    {/*Controle des routes securiser */}
    <Route path="/Home" element={
      <PrivateRoute>
        <Home />
      </PrivateRoute>} />

    <Route path="/UpdatePost" element={
    <PrivateRoute>
      <UpdatePost />
    </PrivateRoute>} />

    <Route path="/Moderator" element={
    <PrivateRoute>
      <Moderator />
    </PrivateRoute>} />

  </Routes>
  </BrowserRouter>
);
