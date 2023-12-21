import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ConsignePage from '../../../pages/ConsignesPage';
import CreateConsigne from '../../../pages/ConsignesPage/upsertConsigne';

function ConsigneRouter() {
  return (
    <Routes>
      <Route path="/" element={<ConsignePage />} />
      <Route path="/upsert/:id?" element={<CreateConsigne />} />
    </Routes>
  );
}

export default ConsigneRouter;
