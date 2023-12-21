import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Box, Button } from '@chakra-ui/react';
import { UilPlus } from '@iconscout/react-unicons';
import RessourceSearchLayout from '../../layouts/RessourceSearchLayout';
import { consigne } from '../../utils/data';
import TableGenerator from '../../layouts/TableGenerator';
import { dataConsignes } from '../../utils/dataFields';
import { deleteConsigne, getAllConsignes } from '../../redux/consignes/actions';

function ConsignePage() {
  const dispatch = useDispatch();
  const consignes = useSelector((state) => state.Consignes.consignes);

  useEffect(() => {
    if (consignes.length === 0) {
      dispatch(getAllConsignes());
    }
  }, []);

  const handleDeleteEntity = (id) => {
    dispatch(deleteConsigne(id));
  };
  return (
    <Box p={5} spacing={5}>
      <RessourceSearchLayout data={consigne} />
      <p style={{ marginTop: 15 }}>
        {consignes.length} Consignes correspondent a votre recherche
      </p>
      <Link to="upsert">
        <Button
          style={{ marginTop: 15 }}
          backgroundColor="#04B7C9"
          colorScheme="blue"
        >
          <UilPlus />
          Creer une consigne
        </Button>
      </Link>
      <Box marginTop="20px">
        <TableGenerator
          titleModalDelete="Supprimer une consigne"
          bodyModalDelete="Etes-vous sur de vouloir supprimer cette consigne ?"
          entityType="consigne"
          handleDeleteEntity={handleDeleteEntity}
          data={dataConsignes}
        />
      </Box>
    </Box>
  );
}

export default ConsignePage;
