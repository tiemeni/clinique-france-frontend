import React, { useRef, memo } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import frlocale from '@fullcalendar/core/locales/fr';
import interactionPlugin from '@fullcalendar/interaction';
import { Box, Text } from '@chakra-ui/react';
import Pikaday from 'pikaday';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import EventContent from './EventContent';
import {
  onChangeCalendar,
  onDateSelected,
  onOpenDialog,
} from '../../redux/common/actions';
import {
  headerToolbar,
  months,
  slotLabelFormat,
  weekdays,
  weekdaysShort,
} from '../../utils/variables/fullcalendar';
import Loader from './Loader';
import { useSocket } from '../../providers/socket';

function Agenda() {
  const dispatch = useDispatch();
  const calendarRef = useRef(null);
  const pickerRef = useRef(null);
  const { practitionersCheckedList } = useSelector((state) => state.Praticiens);
  const { copyId } =
    useSelector((state) => state.Appointments);
  const socket = useSocket();

  const handlePikadayDateChange = (date) => {
    const calendarApi = calendarRef.current.getApi();
    if (date.toString() !== calendarRef.current.getApi().getDate().toString()) {
      calendarApi.gotoDate(new Date(date));
    }
  };

  const onDateClick = (info) => {
    const { dateStr } = info;
    const dateClicked = moment(dateStr);
    if (dateClicked.isBefore(moment())) {
      dispatch(
        onOpenDialog({ open: true, idRdv: null, mode: 'alert', dateStr }),
      );
      return;
    }
    dispatch(onDateSelected({ date: dateStr, isOpen: true, mode: copyId ? null : 'create' }));
  };
  const renderEventContent = ({ event }) => <EventContent event={event} />;
  const onLoad = (isLoading) => dispatch(onChangeCalendar(isLoading));
  const dayHeaderContent = (info) => <Text fontSize="sm">{info.text}</Text>;
  const onDatesSet = (event) => {
    if (pickerRef?.current) {
      pickerRef.current.setDate(new Date(event.startStr), {
        triggerChangeEvent: false,
      });
    }
  };

  const customButtons = {
    miniCalendar: {
      icon: 'fa-calendar',
      click: () => {
        pickerRef.current.show();
      },
    },
  };

  React.useEffect(() => {
    const picker = new Pikaday({
      field: document.querySelector('.fc-miniCalendar-button'),
      format: 'yy-mm-dd',
      onSelect: handlePikadayDateChange,
      i18n: {
        previousMonth: 'Mois précedent',
        nextMonth: 'Mois prochain',
        months,
        weekdays,
        weekdaysShort,
      },
      firstDay: 1,
      showWeekNumber: true,
    });
    pickerRef.current = picker;

    return () => {
      picker.destroy();
    };
  }, []);

  React.useEffect(() => {
    socket.on('refetchEvents', () => {
      calendarRef.current.getApi().refetchEvents();
    });
  }, [socket]);

  return (
    <Box position="relative" w="full">
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, resourceTimeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        weekends
        dayCount
        locale={frlocale}
        initialDate={new Date()}
        slotMinTime="08:00:00"
        slotMaxTime="18:00:00"
        slotDuration="00:05:00"
        slotLabelInterval="00:30:00"
        nowIndicator
        datesAboveResources
        dayMaxEventRows
        allDaySlot={false}
        weekNumbers
        stickyHeaderDates
        height="auto"
        eventContent={renderEventContent}
        customButtons={customButtons}
        datesSet={onDatesSet}
        dayHeaderContent={dayHeaderContent}
        dateClick={onDateClick}
        headerToolbar={headerToolbar}
        slotLabelFormat={slotLabelFormat}
        eventClassNames="calendar-event"
        timeZone='local'
        
        eventSources={[
          {
            url: `${process.env.REACT_APP_BASE_URL}/appointments/`,
            extraParams: {
              idp: practitionersCheckedList.idsList,
            },
          },
        ]}
        eventSourceSuccess={(rawEvents) => rawEvents.data}
        loading={onLoad}
      />
      <Loader />
    </Box>
  );
}

export default memo(Agenda);
