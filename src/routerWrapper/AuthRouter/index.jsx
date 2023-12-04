import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../../pages/LoginPage';

function AuthRouter() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
    </Routes>
  );
}

export default AuthRouter;
