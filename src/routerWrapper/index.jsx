import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ContentRouter from './ContentRouter';
import AuthRouter from './AuthRouter';
import AppointmentPDF from '../components/pdf/appointment-pdf';

function Routeur() {
  

  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthRouter />} />
        <Route path="/content/*" element={<ContentRouter />} />
        <Route path="/print-pdf" element={<AppointmentPDF />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routeur;
