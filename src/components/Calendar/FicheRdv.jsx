import {
  Alert,
  AlertIcon,
  Button,
  Divider,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
  VStack,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { UilUser, UilHistoryAlt, UilPen } from '@iconscout/react-unicons';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field } from 'formik';
import moment from 'moment';
import { onEventClick } from '../../redux/common/actions';
import { onUpdateAppointment } from '../../redux/appointments/actions';
import LoadingText from '../elements/WaitingMessage';

function RdvInfo() {
  const allMotifs = useSelector((state) => state.Motifs.motifs);
  return (
    <VStack alignItems="flex-start" w="full" gap={5}>
      <HStack minW="full">
        <FormControl isRequired>
          <FormLabel color="gray.500" fontSize="sm">
            Statut du RDV
          </FormLabel>
          <Field fontSize="sm" as={Select} id="status" name="status">
            <option value="Annulé">Annulé</option>
            <option value="Planifié">Planifié</option>
            <option value="Absence excusée">Absence excusée</option>
            <option value="Absence non excusée">Absence non excusé</option>
            <option value="En salle d'attente">En salle d&apos;attente</option>
            <option value="Traité">Traité</option>
          </Field>
        </FormControl>
        <FormControl isRequired>
          <FormLabel color="gray.500" fontSize="sm">
            Motif
          </FormLabel>
          <Field fontSize="sm" as={Select} id="motif" name="motif">
            {allMotifs.map((m) => (
              <option key={m._id} value={m._id}>
                {m.label}
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
            isReadOnly
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
            name="duration"
            fontSize="sm"
            type="number"
          />
        </FormControl>
      </HStack>
    </VStack>
  );
}

function FicheRdv() {
  const { showFicheRdv, infoRdv } = useSelector((state) => state.Common);
  const { isLoading, success, isFailed } = useSelector(
    (state) => state.Appointments,
  );
  const updateRDVError = useSelector((state) => state.Appointments.updateRDVError);
  const allMotifs = useSelector((state) => state.Motifs.motifs);
  const patient = infoRdv?.patient ?? null;
  const dispatch = useDispatch();
  const toast = useToast();
  const initialValues = {
    status: infoRdv?.status,
    motif: allMotifs.find(
      (m) => m.label === infoRdv.motif || m.nom === infoRdv.motif,
    )?._id,
    date: moment(infoRdv?.date).format('YYYY-MM-DD'),
    heureDebut: infoRdv?.timeStart,
    heureReel: infoRdv?.timeStart,
    duration: infoRdv?.duree,
    email: patient?.email,
    phone: patient?.telephone,
    birthdate: moment(patient?.birthdate).format('YYYY-MM-DD'),
    comments: '',
    medecin: '',
  };
  const tabs = [
    {
      key: 1,
      text: 'Rendez-vous',
      icon: UilUser,
    },
    {
      key: 2,
      text: 'Historique de gestion',
      icon: UilHistoryAlt,
    },
  ];

  const onClose = () =>
    dispatch(
      onEventClick({
        showFicheRdv: false,
        infoRdv: {},
      }),
    );

  // const onDelete = () => dispatch(onOpenDialog(true));
  const onSubmit = (data) => {
    dispatch(
      onUpdateAppointment({
        ...data,
        date_long: infoRdv.dateLong,
        _id: infoRdv._id,
      }),
    );
  };

  useEffect(() => {
    if (success || (!success && isFailed)) {
      const status = !success && isFailed ? 'error' : 'success';
      const titleText = success
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
  }, [success, isFailed]);

  return (
    <Modal
      size="3xl"
      isOpen={showFicheRdv}
      onClose={onClose}
      closeOnOverlayClick={false}
      autoFocus
    >
      <ModalOverlay />
      <ModalContent roundedTop={10}>
        <ModalHeader bg="primary.500" roundedTop={10}>
          <HStack>
            <Text fontWeight="normal" fontSize="lg" color="white">
              Fiche de rendez-vous de:
            </Text>
            <Text fontWeight="normal" fontSize="lg" color="white">
              M. {patient?.name} {patient?.surname}, né(e) le{' '}
              {moment(patient?.birthdate).format('DD/MM/YYYY')}
            </Text>
          </HStack>
        </ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody px={5} pt={5}>
          <Tabs variant="unstyled">
            <TabList bg="primary.500" color="white">
              {tabs.map((tab) => (
                <Tab
                  key={tab.key}
                  fontSize="sm"
                  borderRightColor="dark.100"
                  borderRightWidth={1}
                  _selected={{ bg: 'primary.900' }}
                >
                  <HStack>
                    <Icon as={tab.icon} boxSize={4} />
                    <Text>{tab.text}</Text>
                  </HStack>
                </Tab>
              ))}
            </TabList>
            <TabIndicator />

            <TabPanels>
              <TabPanel>
                <VStack alignItems="flex-start" gap={10}>
                  <VStack alignItems="flex-start" w="full">
                    <Text fontSize="lg" fontWeight="bold">
                      Avec Dr {infoRdv?.praticien} ({infoRdv?.profession})
                    </Text>
                    <Text color="secondary.500">{infoRdv?.lieu}</Text>
                    <Divider />
                    <Text fontSize="xs">
                      Enregistré le{' '}
                      {moment(infoRdv?.createdAt).format(
                        'dddd D MMMM YYYY [à] HH:mm',
                      )}
                    </Text>
                  </VStack>

                  <VStack alignItems="flex-start" w="full">
                    <Formik initialValues={initialValues} onSubmit={onSubmit}>
                      {({ handleSubmit }) => (
                        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                          <VStack alignItems="flex-start" gap={5}>
                            <RdvInfo />

                            <Divider />
                            <VStack alignItems="flex-start" w="full" gap={5}>
                              <HStack>
                                <Text fontSize="lg">Patient:</Text>
                                <Text fontSize="lg">
                                  {patient.name} {patient.surname}
                                </Text>
                                <Link
                                  display="flex"
                                  alignItems="center"
                                  gap=".2em"
                                  fontSize="sm"
                                  href={`/content/patient/upsert/${patient._id}`}
                                  color="primary.500"
                                  ml={5}
                                >
                                  <Icon as={UilPen} boxSize={4} />
                                  <Text>Voir la fiche patient</Text>
                                </Link>
                              </HStack>
                              <HStack w="full">
                                <FormControl isReadOnly>
                                  <FormLabel fontSize="sm" color="gray.500">
                                    Email
                                  </FormLabel>
                                  <Field
                                    as={Input}
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Adresse mail"
                                    fontSize="sm"
                                  />
                                </FormControl>
                                <FormControl isReadOnly>
                                  <FormLabel fontSize="sm" color="gray.500">
                                    Téléphone
                                  </FormLabel>
                                  <Field
                                    as={Input}
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    placeholder="Numéro de téléphone"
                                    fontSize="sm"
                                  />
                                </FormControl>
                              </HStack>
                              <HStack w="full">
                                <FormControl isReadOnly>
                                  <FormLabel fontSize="sm" color="gray.500">
                                    Date de naissance
                                  </FormLabel>
                                  <Field
                                    as={Input}
                                    type="date"
                                    id="birthdate"
                                    name="birthdate"
                                    placeholder="Date de naissance"
                                    fontSize="sm"
                                  />
                                </FormControl>
                                <FormControl isReadOnly>
                                  <FormLabel fontSize="sm" color="gray.500">
                                    Médecin traitant
                                  </FormLabel>
                                  <Field
                                    as={Input}
                                    type="text"
                                    id="medecin"
                                    name="medecin"
                                    placeholder="Médecin traitant"
                                    fontSize="sm"
                                  />
                                </FormControl>
                              </HStack>
                              <FormControl>
                                <FormLabel fontSize="sm" color="gray.500">
                                  Commentaire
                                </FormLabel>
                                <Field
                                  as={Textarea}
                                  id="comment"
                                  name="comments"
                                  placeholder="Commentaire..."
                                  fontSize="sm"
                                />
                              </FormControl>
                            </VStack>
                            <VStack w="full" gap={5} mt={5}>
                              {updateRDVError && <Alert status="error" mt={2} width="100%">
                                <AlertIcon />
                                {updateRDVError}
                              </Alert>}
                              <HStack justifyContent="start" w="full">
                                <Button
                                  type="submit"
                                  size="md"
                                  width="100%"
                                  colorScheme="primary"
                                  isLoading={isLoading}
                                  loadingText={LoadingText}
                                >
                                  <Text fontSize="sm" fontWeight="normal">
                                    Modifier
                                  </Text>
                                </Button>
                              </HStack>
                            </VStack>
                          </VStack>
                        </form>
                      )}
                    </Formik>
                  </VStack>
                </VStack>
              </TabPanel>
              <TabPanel>
                <p>two!</p>
              </TabPanel>
              <TabPanel>
                <p>three!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>

        <ModalFooter flexDirection="column" gap={5} pt={0}>
          <Divider />
          <Button size="md" onClick={onClose} bg="gray.900" ml="auto">
            <Text fontSize="sm" fontWeight="normal" color="white">
              Fermer
            </Text>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default FicheRdv;
