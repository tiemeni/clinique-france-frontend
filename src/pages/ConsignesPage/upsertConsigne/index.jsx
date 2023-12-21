import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, GridItem } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import FormGenerator from '../../../layouts/FormGenerator';
import getAllCivilities from '../../../redux/civility/actions';
import getAllGroupes from '../../../redux/groupes/actions';
import { getAllSpecialities } from '../../../redux/speciality/actions';
import {
  getAllLieux,
} from '../../../redux/lieux/actions';
import { upsertConsigne } from '../../../utils/data';
import { createConsigne, updateConsigne } from '../../../redux/consignes/actions';

const consigneApiFormatter = (data) => ({
  label: data?.label,
  content: data?.content,
  _id: data?._id
});

function CreateConsigne() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const consignes = useSelector((state) => state.Consignes.consignes);
  const [launchConsigne, setLaunchConsigne] = useState(true);
  const [consigneToUpdate, setConsigneToUpdate] = useState({});
  const [data] = useState(upsertConsigne);
  useEffect(() => {
    consignes.forEach((l) => {
      if (l?._id === id) {
        setConsigneToUpdate(l);
        setLaunchConsigne(false);
      }
    });
    dispatch(getAllCivilities());
    dispatch(getAllGroupes());
    dispatch(getAllSpecialities());
    dispatch(getAllLieux());
  }, []);

  if (id && launchConsigne) {
    return 'launching consignes';
  }

  const handlePost = (payload) => {
    if (id) {
      dispatch(updateConsigne(payload));
    } else {
      dispatch(createConsigne(payload));
    }
  };

  return (
    <Grid templateColumns="repeat(7, 1fr)" gap={4} mt={10} mb={20}>
      <GridItem colStart={2} colEnd={6} rowStart={1}>
        <FormGenerator
          handlePost={handlePost}
          editeData={consigneApiFormatter(consigneToUpdate)}
          data={data}
        />
      </GridItem>
    </Grid>
  );
}

export default CreateConsigne;
