import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LieuPage from '../../../pages/LieuxPage';
import CreateLieux from '../../../pages/LieuxPage/UpsertLieux';

function LieuxRouter() {
  return (
    <Routes>
      <Route path="/" element={<LieuPage />} />
      <Route path="/upsert/:id?" element={<CreateLieux />} />
    </Routes>
  );
}

export default LieuxRouter;
