import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PraticienPage from '../../../pages/PraticienPages';
import CreatePraticien from '../../../pages/PraticienPages/UpsertPratcien';
import ChangePasswordPraticien from '../../../pages/PraticienPages/ChangePassword';

function PraticienRouter() {
  return (
    <Routes>
      <Route path="/" element={<PraticienPage />} />
      <Route path="/upsert/:id?" element={<CreatePraticien />} />
      <Route path="/change-pwd/:id?" element={<ChangePasswordPraticien />} />
    </Routes>
  );
}

export default PraticienRouter;
