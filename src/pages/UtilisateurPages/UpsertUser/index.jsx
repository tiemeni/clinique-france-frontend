import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Grid, GridItem } from '@chakra-ui/react';
import getAllCivilities from '../../../redux/civility/actions';
import getAllGroupes from '../../../redux/groupes/actions';
import { getAllSpecialities } from '../../../redux/speciality/actions';
import { getAllLieux } from '../../../redux/lieux/actions';
import { userCreateOrEdite } from '../../../utils/data';
import FormGenerator from '../../../layouts/FormGenerator';
import { postUser, updateUser } from '../../../redux/user/actions';

const userApiFormatter = (data) => ({
  civility: data.civility,
  name: data.name,
  surname: data.surname,
  birthdate: moment(data.birthdate).format('YYYY-MM-DD'),
  telephone: data.telephone,
  email: data.email,
  password: data.password,
  initiales: data.initiales,
  active: data.active ? 1 : 2,
  groups: data?.groups,
  _id: data._id,
});

function CreateUser() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const users = useSelector((state) => state.User.users);
  const [launchUser, setLaunchUser] = useState(true);
  const [userToUpdate, setUserToUpdate] = useState({});
  const [data] = useState(userCreateOrEdite);
  useEffect(() => {
    users.forEach((u) => {
      if (u?._id === id) {
        setUserToUpdate(u);
        setLaunchUser(false);
      }
    });
    dispatch(getAllCivilities());
    dispatch(getAllGroupes());
    dispatch(getAllSpecialities());
    dispatch(getAllLieux());
  }, []);

  if (id && launchUser) {
    return 'launching users';
  }

  const handlePost = (user) => {
    if (id) {
      dispatch(updateUser(user));
    } else {
      dispatch(postUser(user));
    }
  };

  return (
    <Grid templateColumns="repeat(7, 1fr)" gap={4} mt={10} mb={20}>
      <GridItem colStart={2} colEnd={6} rowStart={1}>
        <FormGenerator
          handlePost={handlePost}
          editeData={userApiFormatter(userToUpdate)}
          data={data}
        />
      </GridItem>
    </Grid>
  );
}

export default CreateUser;
