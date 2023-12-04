import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UsersPage from '../../../pages/UtilisateurPages';
import CreateUser from '../../../pages/UtilisateurPages/UpsertUser';

function UserRouter() {
  return (
    <Routes>
      <Route path="/" element={<UsersPage />} />
      <Route path="/upsert/:id?" element={<CreateUser />} />
    </Routes>
  );
}

export default UserRouter;
