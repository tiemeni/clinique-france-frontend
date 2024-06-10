import React, { useEffect, useState } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ChangePasswordComponent from '../../../components/ChangePassComp';
import { getAllPatients, updatePatient } from '../../../redux/patient/actions';
import { UPDATE_PATIENT_FINISHED } from '../../../redux/patient/types';




function ChangePasswordPatient() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const patients = useSelector((state) => state.Patient.patients);
  const [patientToUpdate, setPatientToUpdate] = useState({});

  const [launchPatient, setLaunchPatient] = useState(true);
 
  const navigate = useNavigate()

  
  useEffect(() => {
    if(patients.length === 0) dispatch(getAllPatients());
    patients.forEach((u) => {
      if (u?._id === id) {
        setPatientToUpdate(u);
        setLaunchPatient(false);
      }
    });
  },[patients]);

  if (id && launchPatient) {
    return 'launching patients';
  }

  


 

  const handleChangePass = (password) => {
   
    const patient = { ...patientToUpdate,password}
      dispatch(updatePatient(patient))
    
    
  }


 


  return (
    <ChangePasswordComponent
      entityType='patient'
      entity={patientToUpdate}
      handler={handleChangePass}
      onCancel={() => {
        dispatch({type:UPDATE_PATIENT_FINISHED})
        navigate(-1)
      }}
     
    />
  );
}

export default ChangePasswordPatient;
