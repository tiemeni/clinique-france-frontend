import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Box, Button } from '@chakra-ui/react';
import { UilPlus } from '@iconscout/react-unicons';
import RessourceSearchLayout from '../../layouts/RessourceSearchLayout';
import { motif } from '../../utils/data';
import { dataMotifs } from '../../utils/dataFields';
import TableGenerator from '../../layouts/TableGenerator';
import { deleteMotif, getAllMotifs,/* searchMotif */ } from '../../redux/motifs/actions';
import { getAllConsignes } from '../../redux/consignes/actions';
import { SEARCH_WB_MOTIF } from '../../redux/motifs/types';

function MotifsPage() {
  const dispatch = useDispatch();
  const motifs = useSelector((state) => state.Motifs.motifs);
  const filteredMotifs = useSelector((state) => state.Motifs.filteredMotifs);

  useEffect(() => {
    dispatch(getAllMotifs());
    dispatch(getAllConsignes());

  }, []);

  const handleDeleteEntity = (id) => {
    dispatch(deleteMotif(id));
  };

 const cle = true;
 const type='MOTIF';

  const handlePost = (m) => {
    
    if(m !== null ){
      //  dispatch(searchMotif({nom : m?.nom, couleur: m?.couleur}));
      dispatch({type: SEARCH_WB_MOTIF, payload:m.nom?.toLowerCase()})
    }
  };

  const numberOfMotifsLabel = () => {
 
      if (filteredMotifs?.length === 0) {
      return   `aucun motif ne correspond à votre recherche`;
    }
    if (filteredMotifs?.length < motifs.length) {
      return  `${filteredMotifs?.length} motif${filteredMotifs?.length===1? '':'s'} sur ${motifs?.length} correspond${filteredMotifs?.length===1? '':'ent'} à votre recherche`;
    } 

    return `${filteredMotifs?.length} motif${filteredMotifs?.length===1? '':'s'} au total`;
  
   
 }

  return (
    <Box p={5} spacing={5}>
      <RessourceSearchLayout data={motif} type={type} cle={cle} handlePost={handlePost} searchLabel="recherche d'un motif de rendez-vous " />
      <p style={{ marginTop: 15 }}>
        {numberOfMotifsLabel()}
      </p>
      <Link to="upsert">
        <Button
          style={{ marginTop: 15 }}
          backgroundColor="#04B7C9"
          colorScheme="blue"
        >
          <UilPlus />
          Creer un motif
        </Button>
      </Link>
      <Box marginTop="20px">
        <TableGenerator
          titleModalDelete="Supprimer un motif"
          bodyModalDelete="Etes-vous sur de vouloir supprimer ce motif ?"
          handleDeleteEntity={handleDeleteEntity}
          entityType="motif"
          data={dataMotifs}
        />
      </Box>
    </Box>
  );
}

export default MotifsPage;
