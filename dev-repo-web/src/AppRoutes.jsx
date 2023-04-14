import React from "react";

import { AuthProvider } from './context/auth';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate, 
} from "react-router-dom";

import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';

const AppRoutes = () => {
  return(
    <Router>
      <AuthProvider>
        <Routes>
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/" element={<MainPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default AppRoutes;
