import React, { useEffect, memo, useState } from 'react';
import { Box, HStack, Heading, Switch, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import CalendarAppointment from './CalendarAppointment';
import Agenda from './Agenda';
import FicheRdv from './FicheRdv';
import ReportAppointment from './ReportAppointment';
import Dialog from './Dialog';

function Calendar() {
  const [calendarTItle, setCalendarTItle] = useState();
  const { practitionersCheckedList } = useSelector((state) => state.Praticiens);

  useEffect(() => {
    let title = '';
    if (practitionersCheckedList.namesList?.length) {
      const { length } = practitionersCheckedList.namesList;
      const [value] = practitionersCheckedList.namesList;
      title = length > 1 ? `Affichage de ${length} praticiens` : value;
    }
    setCalendarTItle(title);
  }, [practitionersCheckedList.namesList]);

  return (
    <Box p={5}>
      <HStack justifyContent="flex-end">
        <Text>Agenda</Text>
        <Switch size="lg" colorScheme="primary" />
      </HStack>
      <Heading
        textAlign="center"
        size="lg"
        fontWeight="normal"
        color="primary.500"
        mb={5}
      >
        {calendarTItle}
      </Heading>
      <Agenda />
      <CalendarAppointment />
      <FicheRdv />
      <Dialog />
      <ReportAppointment />
    </Box>
  );
}

export default memo(Calendar);
