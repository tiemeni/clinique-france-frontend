import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Alert,
  AlertIcon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Skeleton,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { UilEllipsisV } from '@iconscout/react-unicons';
import { useDispatch, useSelector } from 'react-redux';
import {
  lieuxFormater,
  motifFormater,
  patientFormater,
  pratFormater,
  userFormater,
} from '../../utils/dataFormater';
import DeleteRessourceDialogue from '../../components/Ressource/DeleteRessource';
import {
  showModalDeleteRessource,
  verifyToken,
} from '../../redux/common/actions';

function TableGenerator({
  data,
  entityType,
  handleDeleteEntity,
  titleModalDelete,
  bodyModalDelete,
}) {
  const showModal = useSelector((state) => state.Common.showModRessource);
  const dispatch = useDispatch();
  const [entityIdToDelete, setEntityIdToDelete] = useState();
  const loadingUsers = useSelector((state) => state.User.loadingUsers);
  const gettingAllLieux = useSelector((state) => state.Lieux.gettingAllLieux);
  const loadingPatients = useSelector((state) => state.Patient.loadingPatients);
  const gettingAllConsigne = useSelector(
    (state) => state.Consignes.gettingAllConsigne,
  );
  const consignes = useSelector((state) => state.Consignes.consignes);
  const gettingAllSpecs = useSelector(
    (state) => state.Specialities.gettingAllSpecs,
  );
  const allPratloading = useSelector(
    (state) => state.Praticiens.allPratloading,
  );
  const loadingMotifs = useSelector((state) => state.Motifs.loadingMotifs);
  const praticiens = useSelector((state) => state.Praticiens.praticiens);
  const filteredUsers = useSelector((state) => state.User.filteredUsers);
  const users = useSelector((state) =>
    filteredUsers.length > 0 ? state.User.filteredUsers : state.User.users,
  );
  const patients = useSelector((state) => state.Patient.patients);
  const lieux = useSelector((state) => state.Lieux.lieux);
  const motifs = useSelector((state) => state.Motifs.motifs);
  const specialities = useSelector((state) => state.Specialities.specialities);

  const errordeletingPraticien = useSelector((state) => state.Praticiens.errordeletingPraticien);
  const errordeletingPatient = useSelector(
    (state) => state.Patient.errordeletingPatient,
  );
  const errorDeletingUser = useSelector((state) => state.User.errorDeletingUser);
  const deletingSpecsError = useSelector((state) => state.Specialities.deletingSpecsError);
  const deletingConsigneError = useSelector((state) => state.Consignes.deletingConsigneError);
  const errordeletingMotif = useSelector((state) => state.Motifs.errordeletingMotif);
  const [data1, setData1] = useState(data);
  const [loading, setLoading] = useState(true);

  const truthinessToRenderTable = (truth, loadingRessource) => {
    let result = [];
    switch (truth) {
      case 'praticien':
        if (loadingRessource) {
          result = [];
        } else {
          result = praticiens;
        }
        break;
      case 'user':
        if (loadingRessource) {
          result = [];
        } else {
          result = users;
        }
        break;
      case 'patient':
        if (loadingRessource) {
          result = [];
        } else {
          result = patients;
        }
        break;
      case 'lieu':
        if (loadingRessource) {
          result = [];
        } else {
          result = lieux;
        }
        break;
      case 'motif':
        if (loadingRessource) {
          result = [];
        } else {
          result = motifs;
        }
        break;
      case 'speciality':
        if (loadingRessource) {
          result = [];
        } else {
          result = specialities;
        }
        break;
      case 'consigne':
        if (loadingRessource) {
          result = [];
        } else {
          result = consignes;
        }
        break;
      default:
        break;
    }
    return !(result?.length === 0 || loadingRessource);
  };

  useEffect(() => {
    dispatch(verifyToken());
    setData1((v) => {
      let ancien = {};
      let formatedData = [];
      if (entityType === 'praticien') {
        formatedData = [];
        praticiens.forEach((e) => {
          formatedData.push(pratFormater(e));
        });
      } else if (entityType === 'user') {
        formatedData = [];
        users.forEach((e) => {
          formatedData.push(userFormater(e));
        });
      } else if (entityType === 'patient') {
        formatedData = [];
        patients.forEach((e) => {
          formatedData.push(patientFormater(e));
        });
      } else if (entityType === 'lieu') {
        formatedData = [];
        lieux.forEach((e) => {
          formatedData.push(lieuxFormater(e));
        });
      } else if (entityType === 'motif') {
        formatedData = [];
        motifs.forEach((e) => {
          formatedData.push(motifFormater(e));
        });
      } else if (entityType === 'speciality') {
        specialities.forEach((e) => {
          formatedData.push(e);
        });
      } else if (entityType === 'consigne') {
        consignes.forEach((e) => {
          formatedData.push(e);
        });
      }
      ancien = { ...v, rows: formatedData };
      return { ...ancien };
    });
    if (
      truthinessToRenderTable(
        entityType,
        !!gettingAllLieux ||
          !!gettingAllSpecs ||
          !!loadingMotifs ||
          !!loadingPatients ||
          !!loadingUsers ||
          !!allPratloading ||
          !!gettingAllConsigne,
      )
    ) {
      setLoading(false);
    }
  }, [praticiens, users, patients, lieux, motifs, specialities, consignes]);

  if (loading) {
    return (
      <Stack width="100%" display="flex" flexDirection="column" mb="10px">
        <Skeleton height="25px" width="100%" borderRadius={10} />
        <Skeleton height="25px" width="100%" borderRadius={10} />
        <Skeleton height="25px" width="100%" borderRadius={10} />
      </Stack>
    );
  }

  return (
    <TableContainer w="100%">
      {(errordeletingPatient || errordeletingPraticien || errorDeletingUser || deletingSpecsError || errordeletingMotif || deletingConsigneError) && (
        <Alert status="error" mt={2} mb={5}>
          <AlertIcon />
          {errordeletingPatient || errordeletingPraticien || errorDeletingUser || deletingSpecsError || errordeletingMotif || deletingConsigneError}
        </Alert>
      )}
      <Table size="sm" variant="striped" colorScheme="gray">
        <Thead bgColor="#2c3e50" height="30px">
          <Tr>
            {data1.cols.map((c) => (
              <Th key={c.label} color="white">
                {c?.label}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data1?.rows?.map((r, e) => (
            <Tr key={r?._id || r + e}>
              <Td fontSize="sm">
                <Menu>
                  <MenuButton
                    as={IconButton}
                    size="xs"
                    variant="unstyled"
                    icon={<UilEllipsisV color="dark.500" size={20} />}
                  />
                  <MenuList>
                    {data1.actions.map(
                      (a) =>
                        (a.editePath || a.label === 'supprimer') && (
                          <Link
                            key={a.label}
                            to={a.editePath ? `${a.editePath}${r?._id}` : null}
                          >
                            <MenuItem
                              onClick={() => {
                                const onDelete = () => {
                                  dispatch(showModalDeleteRessource(true));
                                };
                                if (a.editePath) {
                                  a.action();
                                } else {
                                  setEntityIdToDelete(r?._id);
                                  a.action(onDelete);
                                }
                              }}
                            >
                              {a.label}
                            </MenuItem>
                          </Link>
                        ),
                    )}
                  </MenuList>
                </Menu>
              </Td>
              {data1?.cols?.map(
                (col, i) =>
                  i > 0 && (
                    <Td fontSize="sm" key={`${r[col.fname]}${i}`}>
                      {col.fname !== 'couleur' ? (
                        r[col.fname]
                      ) : (
                        <Stack
                          width="45px"
                          backgroundColor={r[col.fname]}
                          height="25px"
                        />
                      )}
                    </Td>
                  ),
              )}
            </Tr>
          ))}
        </Tbody>
      </Table>
      <DeleteRessourceDialogue
        onDelete={() => {
          handleDeleteEntity(entityIdToDelete);
        }}
        open={showModal}
        title={titleModalDelete}
        body={bodyModalDelete}
        onClose={() => dispatch(showModalDeleteRessource(false))}
      />
    </TableContainer>
  );
}

export default TableGenerator;
