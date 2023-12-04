import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PraticienPage from '../../../pages/PraticienPages';
import CreatePraticien from '../../../pages/PraticienPages/UpsertPratcien';

function PraticienRouter() {
  return (
    <Routes>
      <Route path="/" element={<PraticienPage />} />
      <Route path="/upsert/:id?" element={<CreatePraticien />} />
    </Routes>
  );
}

export default PraticienRouter;
