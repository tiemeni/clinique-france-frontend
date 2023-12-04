import React from 'react';
import { Route, Routes } from 'react-router-dom';
import StructurePage from '../../../pages/StructurePage';

function StructureRouter() {
  return (
    <Routes>
      <Route path="/" element={<StructurePage />} />
    </Routes>
  );
}

export default StructureRouter;
