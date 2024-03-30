import React, { useEffect, useState } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ChangePasswordComponent from '../../../components/ChangePassComp';
import { getAllPraticiens, updatePraticien } from '../../../redux/praticiens/actions';
import { UPDATE_PRATICIEN_FINISHED } from '../../../redux/praticiens/types';




function ChangePasswordPraticien() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [pratToUpdate, setPratToUpdate] = useState({});
  const praticiens = useSelector((state) => state.Praticiens.praticiens);
  const navigate = useNavigate()
  const handleChangePass = async (password) => {
   
    const user = { ...pratToUpdate, password }
      dispatch(updatePraticien(user))
    
    
  }

  const [launchPrat, setLaunchPrat] = useState(true);
  
 
  

  useEffect(() => {
    if(praticiens.length === 0) dispatch(getAllPraticiens());
    praticiens.forEach((p) => {
      if (p?._id === id) {
        setPratToUpdate(p);
        setLaunchPrat(false);
      }
    });
  }, [praticiens]);

  if (id && launchPrat) {
    return 'launching praticiens';
  }

 


  return (
    <ChangePasswordComponent
      entityType='pratician'
      entity={pratToUpdate}
      handler={handleChangePass}
      onCancel={() => {
        dispatch({type: UPDATE_PRATICIEN_FINISHED})
        navigate(-1)
      }}
     
    />
  );
}

export default ChangePasswordPraticien;
