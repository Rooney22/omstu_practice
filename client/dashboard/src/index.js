import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import { CubeProvider } from '@cubejs-client/react';
import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import cube from '@cubejs-client/core';
import AdminLayout from "layouts/Admin.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
  
const cubeApi = cube( 
  process.env.REACT_APP_CUBEJS_KEY, 
  { apiUrl: process.env.REACT_APP_API_URL } 
); 

root.render(
  <CubeProvider cubeApi={cubeApi}>
  <HashRouter>
    <Routes>
      <Route path="/admin/*" element={<AdminLayout />} />
      <Route path="*" element={<Navigate to="/admin/index"/>} />
    </Routes>
  </HashRouter>
  </CubeProvider>
);
