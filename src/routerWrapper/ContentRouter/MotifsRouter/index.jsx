import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MotifsPage from '../../../pages/MotifsPage';
import CreateMotif from '../../../pages/MotifsPage/UpsertMotifs';

function MotifsRouter() {
  return (
    <Routes>
      <Route path="/" element={<MotifsPage />} />
      <Route path="/upsert/:id?" element={<CreateMotif />} />
    </Routes>
  );
}

export default MotifsRouter;
