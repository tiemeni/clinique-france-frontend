import {
  Alert,
  AlertIcon,
  Button,
  Divider,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UilArrowCircleRight, UilPrint } from '@iconscout/react-unicons';
import { Field, Formik } from 'formik';
import moment from 'moment';
import { onDateSelected } from '../../redux/common/actions';
import PatientInfo from './PatientInfo';
import {
  copyAppointmentId,
  createRdv,
  duplicateAppointment,
} from '../../redux/appointments/actions';
import { incrementTime } from '../../utils/helpers';
import LoadingText from '../elements/WaitingMessage';

function CalendarAppointment() {
  const dispatch = useDispatch();
  const { praticiens } = useSelector((state) => state.Praticiens);
  const allMotifs = useSelector((state) => state.Motifs.motifs);
  const errorCreatingRDV = useSelector(
    (state) => state.Appointments.errorCreatingRDV,
  );
  const duplicatingRDVError = useSelector(
    (state) => state.Appointments.duplicatingRDVError,
  );
  const [motifsBySpec, setmotifsBySpec] = useState([]);
  const { openModal, dateSelected, mode } = useSelector(
    (state) => state.Common,
  );
  const {
    copyId,
    duration,
    pasteProcessing,
    pasteFailed,
    pasteSuccess,
    creatingRDV,
  } = useSelector((state) => state.Appointments);
  const date = moment(dateSelected);
  const toast = useToast();
  const initialValues = {
    email: '',
    motif: '',
    name: '',
    surname: '',
    birthname: '',
    civilite: 'M.',
    address: '',
    city: '',
    birthdate: '',
    phone: '',
    remarque: '',
    date: date.format('yyyy-MM-DD'),
    heureDebut: date.format('HH:mm'),
    heureReel: date.format('HH:mm'),
  };

  const onSubmit = (values) => {
    if (copyId)
      dispatch(
        duplicateAppointment({
          idRdv: copyId,
          date: date.format('yyyy-MM-DD'),
          startTime: date.format('HH:mm'),
          endTime: incrementTime(date.format('HH:mm'), duration),
        }),
      );
    else
      dispatch(
        createRdv({
          ...values,
          date_long: dateSelected ? date : new Date().toISOString(),
        }),
      );
  };
  const onClose = () => {
    dispatch(onDateSelected({ date: '', isOpen: false, mode: '' }));
    dispatch(copyAppointmentId({ id: null, duration: null }));
  };

  React.useEffect(() => {
    if (pasteSuccess || (!pasteSuccess && pasteFailed)) {
      const status = !pasteSuccess && pasteFailed ? 'error' : 'success';
      const titleText = pasteSuccess
        ? `Le rendez-vous à bien été mis à jour`
        : 'Une erreur est survenue lors de la mise à jour du rendez-vous';
      const title = <Text fontSize="sm">{titleText}</Text>;

      toast({
        title,
        status,
        variant: 'solid',
        position: 'top-right',
        isClosable: true,
      });
    }
  }, [pasteSuccess, pasteFailed]);

  return (
    <Modal
      isOpen={openModal}
      size="6xl"
      onClose={onClose}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent roundedTop={10}>
        <ModalHeader roundedTop={10} bg="primary.500">
          <Text fontWeight="normal" fontSize="lg" color="white">
            {copyId
              ? `Rendez-vous le ${date.format('DD/MM/YYYY')} à ${date.format(
                  'HH:mm',
                )}`
              : 'Prendre rendez-vous'}
          </Text>
        </ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody p={5}>
          {copyId ? (
            <Stack>
              <Text textAlign="center">
                Souhaitez-vous copier ce rendez-vous au{' '}
                {`${date.format('DD/MM/YYYY')} à ${date.format('HH:mm')}`} sur
                ce calendrier
              </Text>
              {duplicatingRDVError && <Alert status="error" mt={2} width="100%">
                <AlertIcon />
                {duplicatingRDVError}
              </Alert>}
            </Stack>
          ) : (
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
              {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <VStack gap={10} alignItems="flex-start">
                    <VStack alignItems="start" w="full" gap={5}>
                      <HStack w="full">
                        <FormControl
                          isRequired
                          defaultValue={
                            allMotifs.filter(
                              (m) => m.idSpeciality === praticiens[0]?.job?._id,
                            )[0]?._id
                          }
                          onChange={(e) => {
                            const { job } = praticiens.find(
                              (p) => p._id === e.target.value,
                            );
                            const { _id } = job;
                            setmotifsBySpec(
                              allMotifs.filter((m) => m.idSpeciality === _id),
                            );
                          }}
                        >
                          <FormLabel color="gray.500" fontSize="sm">
                            Praticien
                          </FormLabel>
                          <Field
                            as={Select}
                            id="praticien"
                            name="praticien"
                            fontSize="sm"
                          >
                            {praticiens?.length > 0 &&
                              praticiens.map(({ _id, name, surname, job }) => (
                                <option key={_id} data-job={job} value={_id}>
                                  Dr {name} {surname}
                                </option>
                              ))}
                          </Field>
                        </FormControl>
                        <FormControl isRequired>
                          <FormLabel color="gray.500" fontSize="sm">
                            Motif
                          </FormLabel>
                          <Field
                            as={Select}
                            // defaultValue={allMotifs.find(m => m.idSpeciality === praticiens[0].job?._id)?._id}
                            id="motif"
                            name="motif"
                            fontSize="sm"
                            placeholder="Selectionnez un motif"
                          >
                            {motifsBySpec?.length > 0 &&
                              motifsBySpec.map(({ _id, nom }) => (
                                <option key={_id} value={_id}>
                                  {' '}
                                  {nom}{' '}
                                </option>
                              ))}
                          </Field>
                        </FormControl>
                      </HStack>
                      <HStack w="full">
                        <FormControl isRequired>
                          <FormLabel color="gray.500" fontSize="sm">
                            Date
                          </FormLabel>
                          <Field
                            as={Input}
                            id="date"
                            name="date"
                            fontSize="sm"
                            type="date"
                          />
                        </FormControl>
                        <FormControl isRequired>
                          <FormLabel color="gray.500" fontSize="sm">
                            Heure de début
                          </FormLabel>
                          <Field
                            as={Input}
                            id="heure-debut"
                            name="heureDebut"
                            fontSize="sm"
                            type="time"
                            placeholder="Heure de debut"
                          />
                        </FormControl>
                        <FormControl isRequired>
                          <FormLabel color="gray.500" fontSize="sm">
                            Heure réelle
                          </FormLabel>
                          <Field
                            as={Input}
                            id="heure-reel"
                            name="heureReel"
                            fontSize="sm"
                            type="time"
                            placeholder="Heure de debut"
                          />
                        </FormControl>
                        <FormControl isRequired>
                          <FormLabel color="gray.500" fontSize="sm">
                            Durée (en min.)
                          </FormLabel>
                          <Field
                            as={Input}
                            id="duree"
                            name="duree"
                            fontSize="sm"
                            type="number"
                          />
                        </FormControl>
                      </HStack>
                    </VStack>
                    <Divider />
                    <PatientInfo />
                    {errorCreatingRDV && (
                      <Alert status="error" mt={2} width="50%">
                        <AlertIcon />
                        {errorCreatingRDV}
                      </Alert>
                    )}
                    {mode === 'create' && (
                      <HStack justifyContent="start" w="full" gap={5} mb={10}>
                        <Button
                          type="submit"
                          size="md"
                          colorScheme="primary"
                          rightIcon={<UilArrowCircleRight />}
                          isLoading={pasteProcessing || creatingRDV}
                          loadingText={LoadingText}
                        >
                          <Text fontSize="sm" fontWeight="normal">
                            Valider
                          </Text>
                        </Button>
                        <Button
                          colorScheme="primary"
                          variant="outline"
                          color="primary.500"
                          size="md"
                          rightIcon={<UilPrint />}
                          onClick={onClose}
                        >
                          <Text fontSize="sm" fontWeight="normal">
                            Valider et Imprimer
                          </Text>
                        </Button>
                        <Button size="md" onClick={onClose}>
                          <Text fontSize="sm" fontWeight="normal">
                            Annuler
                          </Text>
                        </Button>
                      </HStack>
                    )}
                  </VStack>
                </form>
              )}
            </Formik>
          )}
        </ModalBody>

        {(mode !== 'create' || copyId) && (
          <ModalFooter flexDirection="column" gap={5} pb={5}>
            <Divider />
            <HStack justifyContent="center" w="full" gap={5}>
              <Button
                size="md"
                colorScheme="primary"
                rightIcon={<UilArrowCircleRight />}
                onClick={onSubmit}
                isLoading={pasteProcessing}
                loadingText={LoadingText}
              >
                <Text fontSize="sm" fontWeight="normal">
                  Valider
                </Text>
              </Button>
              {!copyId && (
                <Button
                  colorScheme="primary"
                  variant="outline"
                  color="primary.500"
                  size="md"
                  rightIcon={<UilPrint />}
                  onClick={onClose}
                >
                  <Text fontSize="sm" fontWeight="normal">
                    Valider et Imprimer
                  </Text>
                </Button>
              )}
              <Button size="md" onClick={onClose}>
                <Text fontSize="sm" fontWeight="normal">
                  Annuler
                </Text>
              </Button>
            </HStack>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
}

export default CalendarAppointment;
