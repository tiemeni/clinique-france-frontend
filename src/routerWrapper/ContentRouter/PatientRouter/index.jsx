import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PatientPage from '../../../pages/PatientPages';
import CreatePatient from '../../../pages/PatientPages/UpsertPatient';

function PatientRouter() {
  return (
    <Routes>
      <Route path="/" element={<PatientPage />} />
      <Route path="/upsert/:id?" element={<CreatePatient />} />
    </Routes>
  );
}

export default PatientRouter;
