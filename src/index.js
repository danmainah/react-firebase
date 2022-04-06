import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import Menu from './pages/Menu';
import Login from './pages/Login';

ReactDOM.render(
<BrowserRouter>
  <Routes>
    <Route exact path="/" element={<Menu />} />
    <Route exact path="/login" element={<Login />} />
  </Routes>
</BrowserRouter>,
document.getElementById('root')
);