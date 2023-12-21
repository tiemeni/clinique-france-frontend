import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Box, Button } from '@chakra-ui/react';
import { UilPlus } from '@iconscout/react-unicons';
import RessourceSearchLayout from '../../layouts/RessourceSearchLayout';
import { praticien } from '../../utils/data';
import TableGenerator from '../../layouts/TableGenerator';
import { dataPatient } from '../../utils/dataFields';
import { deletePatient, getAllPatients, searchPatient } from '../../redux/patient/actions';

function PatientPage() {
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.Patient.patients);

  useEffect(() => {
    dispatch(getAllPatients());
  }, []);

  const handleDeleteEntity = (id) => {
    dispatch(deletePatient(id));
  };

  const cle=true;
  const type='PATIENT';
  const handlePost = (m) => {
  
    if(m !== null ){
      console.log('=== > m in if ', m.nom)
      
      dispatch(searchPatient({ m }));
    }}

  return (
    <Box p={5} spacing={5}>
      <RessourceSearchLayout data={praticien} cle={cle} type={type} handlePost={handlePost}/>
      <p style={{ marginTop: 15 }}>
        {patients.length} patients correspondent a votre recherche
      </p>
      <Link to="upsert">
        <Button
          style={{ marginTop: 15 }}
          backgroundColor="#04B7C9"
          colorScheme="blue"
        >
          <UilPlus />
          Creer un patient
        </Button>
      </Link>
      <Box marginTop="20px">
        <TableGenerator
          titleModalDelete="Supprimer un patient"
          bodyModalDelete="Etes-vous sur de vouloir supprimer ce patient ?"
          entityType="patient"
          handleDeleteEntity={handleDeleteEntity}
          data={dataPatient}
        />
      </Box>
    </Box>
  );
}

export default PatientPage;
