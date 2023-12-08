import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../../pages/LoginPage';
import { verifyToken } from '../../redux/common/actions';
import ContentRouter from '../ContentRouter';

function AuthRouter() {
  const tokenValid = useSelector(state => state.Common.tokenValid)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(verifyToken(true))
  })
  return (
    <Routes>
      {tokenValid ? <Route path="/" element={<ContentRouter />} /> : <Route path="/" element={<LoginPage />} />}
    </Routes>
  );
}

export default AuthRouter;
