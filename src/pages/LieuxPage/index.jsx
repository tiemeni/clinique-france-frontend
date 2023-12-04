import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Box, Button } from '@chakra-ui/react';
import { UilPlus } from '@iconscout/react-unicons';
import RessourceSearchLayout from '../../layouts/RessourceSearchLayout';
import { lieu } from '../../utils/data';
import TableGenerator from '../../layouts/TableGenerator';
import { dataLieux } from '../../utils/dataFields';
import { deleteLieu, getAllLieux } from '../../redux/lieux/actions';

function LieuPage() {
  const dispatch = useDispatch();
  const lieux = useSelector((state) => state.Lieux.lieux);

  useEffect(() => {
    if (lieux.length === 0) {
      dispatch(getAllLieux());
    }
  }, []);

  const handleDeleteEntity = (id) => {
    dispatch(deleteLieu(id));
  };
  return (
    <Box p={5} spacing={5}>
      <RessourceSearchLayout data={lieu} />
      <p style={{ marginTop: 15 }}>
        {lieux.length} lieux correspondent a votre recherche
      </p>
      <Link to="upsert">
        <Button
          style={{ marginTop: 15 }}
          backgroundColor="#04B7C9"
          colorScheme="blue"
        >
          <UilPlus />
          Creer un lieu
        </Button>
      </Link>
      <Box marginTop="20px">
        <TableGenerator
          titleModalDelete="Supprimer un lieu"
          bodyModalDelete="Etes-vous sur de vouloir supprimer ce lieu ?"
          entityType="lieu"
          handleDeleteEntity={handleDeleteEntity}
          data={dataLieux}
        />
      </Box>
    </Box>
  );
}

export default LieuPage;
