import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UsersPage from '../../../pages/UtilisateurPages';
import CreateUser from '../../../pages/UtilisateurPages/UpsertUser';
import ChangePasswordUser from '../../../pages/UtilisateurPages/ChangePassword';

function UserRouter() {
  return (
    <Routes>
      <Route path="/" element={<UsersPage />} />
      <Route path="/upsert/:id?" element={<CreateUser />} />
      <Route path="/change-pwd/:id?" element={<ChangePasswordUser />} />
    </Routes>
  );
}

export default UserRouter;
