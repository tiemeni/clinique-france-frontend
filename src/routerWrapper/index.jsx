import React, { useEffect,useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ContentRouter from './ContentRouter';
import AuthRouter from './AuthRouter';
import { resetApp } from '../redux/common/actions';
import ListeCentres from '../pages/LIsteCentres';
import AppointmentPDF from '../components/pdf/appointment-pdf';

function Routeur() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetApp());
  });

  const [TOKEN, setTokenValue] = useState(localStorage.getItem("acces_bo_token"))

  const handleRes = () => {
      setTokenValue(localStorage.getItem("acces_bo_token"))
  }

  console.log('TOKEN===< > ', TOKEN);

  useEffect(() => {
      handleRes()
  }, [])

  return (
    
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<AuthRouter />} />
        <Route path="/content/*" element={TOKEN ? <ContentRouter /> : <AuthRouter />} />
        <Route path="/liste_centres" element={<ListeCentres />} />
        <Route path="/print-pdf" element={<AppointmentPDF />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routeur;
