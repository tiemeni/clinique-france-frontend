import React, { useEffect, useState } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ChangePasswordComponent from '../../../components/ChangePassComp';
import { getAllPraticiens, updatePraticien } from '../../../redux/praticiens/actions';




function ChangePasswordPraticien() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [pratToUpdate, setPratToUpdate] = useState({});
  const praticiens = useSelector((state) => state.Praticiens.praticiens);
  const navigate = useNavigate()
  const handleChangePass = (password) => {
   
    const user = { ...pratToUpdate,password}
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
      entity={pratToUpdate}
      handler={handleChangePass}
      onCancel={()=> navigate(-1)}
     
    />
  );
}

export default ChangePasswordPraticien;
