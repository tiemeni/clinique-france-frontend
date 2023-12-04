import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Select,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import {
  UilArrowCircleRight,
  UilSearch,
  UilExclamationTriangle,
} from '@iconscout/react-unicons';
import { Field, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import LoadingText from '../elements/WaitingMessage';
import {
  onSearchDispo,
  onUpdateAppointment,
  openReportModal,
} from '../../redux/appointments/actions';
import { slotOptions, dayOptions } from '../../utils/variables/common';

function ReportAppointment() {
  const {
    openReport,
    praticien,
    searching,
    searchError,
    availabilities,
    pname,
    isLoading,
    duration,
    reportId,
  } = useSelector((state) => state.Appointments);
  const dispatch = useDispatch();
  const bgColor = searchError ? 'red.100' : 'secondary.200';
  const date = moment(new Date());
  const [combineState, setCombineState] = useState({
    selected: {},
    isEmpty: false,
  });

  const getSelectedOption = (time) => {
    let { value } = slotOptions[0];
    slotOptions.forEach((option) => {
      const [start, end] = option.value.split('-');
      if (time >= start && time < end) {
        value = option.value;
      }
    });
    return value;
  };
  const initialValues = {
    startDate: date.format('YYYY-MM-DD'),
    day: date.day(),
    slotRange: getSelectedOption(date.format('HH:mm')),
    lieu: '',
    idp: praticien,
    dispo: '',
  };

  const onSave = () => {
    if (Object.keys(combineState.selected).length === 0) {
      setCombineState({ ...combineState, isEmpty: true });
      return;
    }
    const payload = {
      heureDebut: combineState.selected.start,
      date: combineState.selected.date,
      date_long: combineState.selected.date_long,
      duration,
      _id: reportId,
      wasMoved: true,
    };
    dispatch(onUpdateAppointment(payload));
  };
  const onSelected = (value) => {
    setCombineState({
      isEmpty: false,
      selected: {
        start: value.start,
        date: value.date,
        date_long: value.date_long,
      },
    });
  };
  const onSubmit = (data) => {
    setCombineState({ ...combineState, selected: {} });
    dispatch(onSearchDispo(data));
  };
  const onClose = () => {
    dispatch(openReportModal({ isOpen: false, id: null, idp: null }));
    setCombineState({ isEmpty: false, selected: {} });
  };

  useEffect(() => {
    if (openReport) dispatch(onSearchDispo(initialValues));
  }, [openReport]);

  return (
    <Modal
      isOpen={openReport}
      closeOnOverlayClick={false}
      onClose={onClose}
      size="5xl"
    >
      <ModalOverlay />
      <ModalContent roundedTop={10}>
        <ModalHeader roundedTop={10} bg="primary.500">
          <Text fontWeight="normal" fontSize="lg" color="white">
            Choisir une nouvelle disponibilité
          </Text>
        </ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody p={5}>
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <VStack gap={5} alignItems="flex-start">
                  <Accordion
                    w="full"
                    defaultIndex={[0]}
                    style={{ borderTopColor: 'white' }}
                    allowToggle
                  >
                    <AccordionItem>
                      <AccordionButton px={0}>
                        <Text w="full" textAlign="start" fontSize="sm">
                          Filtre de recherche
                        </Text>
                        <AccordionIcon color="black" />
                      </AccordionButton>
                      <AccordionPanel>
                        <VStack w="full" gap={5}>
                          <HStack w="full" gap={5}>
                            <FormControl>
                              <FormLabel color="gray.500" fontSize="sm">
                                Date
                              </FormLabel>
                              <Field
                                as={Input}
                                id="date"
                                name="startDate"
                                fontSize="sm"
                                type="date"
                              />
                            </FormControl>
                            <FormControl>
                              <FormLabel color="gray.500" fontSize="sm">
                                Jour
                              </FormLabel>
                              <Field
                                as={Select}
                                id="day"
                                name="day"
                                fontSize="sm"
                              >
                                {dayOptions.map((option) => (
                                  <option
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </option>
                                ))}
                              </Field>
                            </FormControl>
                            <FormControl>
                              <FormLabel color="gray.500" fontSize="sm">
                                Creneau horaire
                              </FormLabel>
                              <Field
                                as={Select}
                                id="creneau"
                                name="slotRange"
                                fontSize="sm"
                              >
                                {slotOptions.map((option) => (
                                  <option
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </option>
                                ))}
                              </Field>
                            </FormControl>
                            <FormControl isDisabled>
                              <FormLabel color="gray.500" fontSize="sm">
                                Centre
                              </FormLabel>
                              <Field
                                as={Select}
                                id="creneau"
                                name="creneau"
                                fontSize="sm"
                              >
                                <option value="1">Clinique FOUDA</option>
                                <option value="2">8h-10h</option>
                                <option value="3">10h-12h</option>
                                <option value="4">12h-14h</option>
                                <option value="5">14h-16h</option>
                                <option value="6">16h-18h</option>
                              </Field>
                            </FormControl>
                          </HStack>

                          <Button
                            type="submit"
                            size="md"
                            colorScheme="primary"
                            leftIcon={<UilSearch />}
                            loadingText={LoadingText}
                            fontSize="sm"
                            fontWeight="normal"
                            isDisabled={searching || isLoading}
                          >
                            <Text>Rechercher</Text>
                          </Button>
                        </VStack>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                  <VStack alignItems="flex-start" w="full">
                    <HStack gap={3} mb={2}>
                      <Text fontSize="sm">
                        Prochaines disponibilité de Dr {pname}
                      </Text>
                      <HStack
                        bg={
                          combineState.isEmpty ? 'secondary.200' : 'transparent'
                        }
                        px={2}
                        py={1}
                        rounded={5}
                      >
                        <Icon
                          as={UilExclamationTriangle}
                          color={
                            combineState.isEmpty
                              ? 'secondary.500'
                              : 'transparent'
                          }
                          boxSize={4}
                        />
                        <Text
                          fontSize="xs"
                          color={
                            combineState.isEmpty
                              ? 'secondary.500'
                              : 'transparent'
                          }
                        >
                          Veuillez choisir une nouvelle disponibilité
                        </Text>
                      </HStack>
                    </HStack>
                    {availabilities.length !== 0 && (
                      <RadioGroup w="full" name="dispo">
                        <Field>
                          {({ field }) => (
                            <Grid
                              templateColumns="repeat(3, 1fr)"
                              columnGap={5}
                            >
                              {availabilities.map((availability) => (
                                <GridItem key={availability.date_long} w="full">
                                  <Radio
                                    {...field}
                                    colorScheme="primary"
                                    value={availability.date_long}
                                    onClick={() => onSelected(availability)}
                                  >
                                    <Text
                                      fontSize="sm"
                                      onClick={() => onSelected(availability)}
                                    >
                                      {availability.displayedDate}
                                    </Text>
                                  </Radio>
                                </GridItem>
                              ))}
                            </Grid>
                          )}
                        </Field>
                      </RadioGroup>
                    )}
                    {availabilities.length === 0 && (
                      <HStack
                        justifyContent="center"
                        p={5}
                        rounded={5}
                        bg={searching ? 'transparent' : bgColor}
                        w="full"
                      >
                        {!searching && (
                          <>
                            <Icon
                              as={UilExclamationTriangle}
                              color={searchError ? 'red.500' : 'secondary.500'}
                              boxSize={6}
                            />
                            <Text
                              fontSize="sm"
                              color={searchError ? 'red.500' : 'secondary.500'}
                            >
                              {searchError
                                ? 'Une erreur est survenue lors du traitement de la demande.'
                                : "Aucune disponibilité n'a été trouvée pour ce praticien selon les critères définis."}
                            </Text>
                          </>
                        )}
                        {searching && (
                          <>
                            <Spinner
                              emptyColor="secondary.200"
                              speed="0.65s"
                              color="secondary.500"
                              size="md"
                            />
                            <Text fontSize="sm" color="secondary.500">
                              Patientez...
                            </Text>
                          </>
                        )}
                      </HStack>
                    )}
                  </VStack>
                </VStack>
              </form>
            )}
          </Formik>
        </ModalBody>
        <ModalFooter flexDirection="column" gap={5} pb={5}>
          <Divider />
          <HStack justifyContent="center" w="full" gap={5}>
            <Button
              size="md"
              colorScheme="primary"
              rightIcon={<UilArrowCircleRight />}
              loadingText={LoadingText}
              onClick={onSave}
              isLoading={isLoading}
            >
              <Text fontSize="sm" fontWeight="normal">
                Confirmer
              </Text>
            </Button>
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

export default ReportAppointment;
