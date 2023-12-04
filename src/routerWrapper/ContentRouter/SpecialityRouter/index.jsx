import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SpecialityPage from '../../../pages/SpecialityPages';
import CreateSpeciality from '../../../pages/SpecialityPages/UpsertSpeciality';

function SpecialityRouter() {
  return (
    <Routes>
      <Route path="/" element={<SpecialityPage />} />
      <Route path="/upsert/:id?" element={<CreateSpeciality />} />
    </Routes>
  );
}

export default SpecialityRouter;
