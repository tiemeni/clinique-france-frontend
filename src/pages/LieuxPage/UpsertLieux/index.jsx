import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, GridItem } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import FormGenerator from '../../../layouts/FormGenerator';
import { upsertLieux } from '../../../utils/data';
import getAllCivilities from '../../../redux/civility/actions';
import getAllGroupes from '../../../redux/groupes/actions';
import { getAllSpecialities } from '../../../redux/speciality/actions';
import {
  getAllLieux,
  postLieuCallout,
  updateLieu,
} from '../../../redux/lieux/actions';

const convertRegionToNumber = (region) => {
  let result;
  switch (region?.toString().toLowerCase()) {
    case 'centre':
      result = 1;
      break;
    case 'garoua':
      result = 2;
      break;
    default:
      break;
  }
  return result;
};

const convertVilleToNumber = (region) => {
  let result;
  switch (region.toString().toLowerCase()) {
    case 'yaounde':
      result = 1;
      break;
    case 'douala':
      result = 2;
      break;
    default:
      break;
  }
  return result;
};

const lieuApiFormatter = (data) => ({
  active: data.active ? 1 : 2,
  label: data?.label,
  region: data?.region && convertRegionToNumber(data?.region),
  ville: data?.ville && convertVilleToNumber(data?.ville),
  reference: data?.reference,
  initiales: data?.initiales,
  longitude: data?.location && JSON.parse(data?.location)?.longitude,
  latitude: data?.location && JSON.parse(data?.location)?.latitude,
  _id: data?._id,
  codePostal: data?.codePostal,
});

function CreateLieux() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const lieux = useSelector((state) => state.Lieux.lieux);
  const [launchLieu, setLaunchLieu] = useState(true);
  const [lieuToUpdate, setLieuToUpdate] = useState({});
  const [data] = useState(upsertLieux);
  useEffect(() => {
    lieux.forEach((l) => {
      if (l?._id === id) {
        setLieuToUpdate(l);
        setLaunchLieu(false);
      }
    });
    dispatch(getAllCivilities());
    dispatch(getAllGroupes());
    dispatch(getAllSpecialities());
    dispatch(getAllLieux());
  }, []);

  if (id && launchLieu) {
    return 'launching lieux';
  }

  const handlePost = (payload) => {
    if (id) {
      dispatch(updateLieu(payload));
    } else {
      dispatch(postLieuCallout(payload));
    }
  };

  return (
    <Grid templateColumns="repeat(7, 1fr)" gap={4} mt={10} mb={20}>
      <GridItem colStart={2} colEnd={6} rowStart={1}>
        <FormGenerator
          handlePost={handlePost}
          editeData={lieuApiFormatter(lieuToUpdate)}
          data={data}
        />
      </GridItem>
    </Grid>
  );
}

export default CreateLieux;
