import {
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
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UilArrowCircleRight, UilPrint } from '@iconscout/react-unicons';
import { Field, Formik } from 'formik';
import moment from 'moment';
import { onDateSelected } from '../../redux/common/actions';
import PatientInfo from './PatientInfo';
import {
  copyAppointmentId,
  duplicateAppointment,
} from '../../redux/appointments/actions';
import { incrementTime } from '../../utils/helpers';
import LoadingText from '../elements/WaitingMessage';

function CalendarAppointment() {
  const dispatch = useDispatch();
  const { openModal, dateSelected } = useSelector((state) => state.Common);
  const { copyId, duration, pasteProcessing, pasteFailed, pasteSuccess } =
    useSelector((state) => state.Appointments);
  const date = moment(dateSelected);
  const toast = useToast();
  const initialValues = {
    email: '',
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
    else console.log(values);
  };
  const onClose = () => {
    dispatch(onDateSelected({ date: '', isOpen: false }));
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
            <Text textAlign="center">
              Souhaitez-vous copier ce rendez-vous au{' '}
              {`${date.format('DD/MM/YYYY')} à ${date.format('HH:mm')}`} sur ce
              calendrier
            </Text>
          ) : (
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
              {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <VStack gap={10} alignItems="flex-start">
                    <VStack alignItems="start" w="full" gap={5}>
                      <HStack w="full">
                        <FormControl isDisabled>
                          <Field
                            as={Select}
                            id="praticien"
                            name="praticien"
                            fontSize="sm"
                          >
                            <option value="">Dr OTPHA2 WIEM Pierre</option>
                          </Field>
                        </FormControl>
                        <FormControl>
                          <Field
                            as={Select}
                            id="lieu"
                            name="lieu"
                            fontSize="sm"
                            placeholder="Selectionnez un lieu"
                          >
                            <option value="">Clinique optha meridien</option>
                          </Field>
                        </FormControl>
                        <FormControl>
                          <Field
                            as={Select}
                            id="motif"
                            name="motif"
                            fontSize="sm"
                            placeholder="Selectionnez un motif"
                          >
                            <option value="Clinique optha meridien">Clinique optha meridien</option>
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
                  </VStack>
                </form>
              )}
            </Formik>
          )}
        </ModalBody>

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
      </ModalContent>
    </Modal>
  );
}

export default CalendarAppointment;
