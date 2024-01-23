import React, { useRef } from 'react';
import {
  Box,
  Divider,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  Portal,
  Text,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import {
  UilCopy,
  UilArrowRight,
  UilTrashAlt,
  UilPrint,
  UilCheck,
  UilTimes,
  UilInvoice,
  UilPhoneAlt,
  UilShare,
} from '@iconscout/react-unicons';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { onOpenDialog, onEventClick } from '../../redux/common/actions';
import TooltipContent from './TooltipContent';
import Item from './Item';
import {
  copyAppointmentId,
  onUpdateAppointment,
  openReportModal,
} from '../../redux/appointments/actions';

const styles = {
  icon: {
    position: 'absolute',
    right: 1,
    top: 1,
  },
};
function EventContent({ event }) {
  const {
    _id,
    status,
    bgColor,
    timeStart,
    patient,
    motif,
    provenance,
    duree,
    dateRdv,
    lieu,
    name,
    surname,
    profession,
    dateLong,
    idp,
    wasMoved,
  } = event.extendedProps;
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [isVisible, setIsVisible] = React.useState(false);
  const dispatch = useDispatch();
  const initialRef = useRef(null);

  const openPopover = () => {
    if (isOpen) return;
    setIsVisible(true);
  };
  const closePopover = () => setIsVisible(false);
  const openMenu = (e) => {
    e.preventDefault();
    onOpen();
    closePopover();
  };

  const eventClick = () => {
    const createdAt = event.extendedProps.created_at;
    dispatch(
      onEventClick({
        showFicheRdv: true,
        infoRdv: {
          _id,
          patient,
          motif,
          timeStart,
          date: dateRdv,
          duree,
          status,
          lieu: lieu?.label,
          praticien: `${name.toUpperCase()} ${surname}`,
          profession,
          createdAt,
          dateLong,
        },
      }),
    );
  };

  const onReport = () =>
    dispatch(
      openReportModal({
        isOpen: true,
        id: _id,
        idp,
        praticien: `${name} ${surname}`,
        duration: duree,
      }),
    );
  const onDelete = () =>
    dispatch(onOpenDialog({ open: true, idRdv: _id, mode: 'delete' }));
  const onCopyPaste = () =>
    dispatch(copyAppointmentId({ id: _id, duration: duree }));
  const onPrint = () => {
    const currentURL = window.location.href;
    const url = currentURL.replace('/content', '/print-pdf');
    window.open(url, '_blank');
  };
  const onChangeStatus = (value) =>
    dispatch(onUpdateAppointment({ _id, status: value, isMenu: true }));

  const itemsList = [
    {
      key: 1,
      icon: UilCopy,
      intitule: 'Copier-coller le rdv',
      func: onCopyPaste,
    },
    {
      key: 2,
      icon: UilArrowRight,
      intitule: 'Déplacer le rdv',
      func: onReport,
    },
    {
      key: 3,
      icon: UilTrashAlt,
      intitule: 'Supprimer le rdv',
      color: 'red.500',
      textColor: 'red.500',
      func: onDelete,
    },
    {
      key: 4,
      icon: UilPrint,
      intitule: 'Imprimer le rdv',
      func: onPrint,
    },
    {
      key: 5,
      icon: UilInvoice,
      intitule: 'Encaissement',
      divider: true,
    },
    {
      key: 7,
      icon: UilCheck,
      intitule: 'Absence excusée',
      func: () => onChangeStatus('Absence excusée'),
    },
    {
      key: 8,
      icon: UilTimes,
      intitule: 'Absence non excusée',
      func: () => onChangeStatus('Absence non excusée'),
    },
    {
      key: 8,
      icon: UilPhoneAlt,
      intitule: 'Appel Urgence',
      divider: true,
    },
  ];

  return (
    <Menu
      isOpen={isOpen}
      onClose={onClose}
      gutter={-8}
      placement="bottom-start"
      initialFocusRef={initialRef}
      isLazy
      key={_id}
    >
      <Tooltip
        label={
          <TooltipContent
            patient={patient}
            motif={motif}
            duration={duree}
            provenance={provenance}
          />
        }
        bg="white"
        color="black"
        hasArrow
        gutter={0}
        isOpen={isVisible}
        onOpen={openPopover}
        onClose={closePopover}
      >
        <MenuButton
          as={Box}
          height="full"
          w="full"
          overflow="hidden"
          bg={bgColor}
          p={1}
          roundedRight="0.3em"
          onContextMenu={openMenu}
          onClick={eventClick}
          position="relative"
        >
          {wasMoved && (
            <Icon as={UilShare} boxSize={3} color="white" style={styles.icon} />
          )}
          <Text color={event.textColor} fontSize="small">
            {timeStart}
          </Text>
          <Text
            fontSize="small"
            whiteSpace="nowrap"
            textOverflow="unset"
            color={event.textColor}
            textDecoration={
              status === 'Absence non excusée' ? 'line-through' : 'none'
            }
          >
            {patient?.civ ?? ''}
            <strong>{patient?.name}</strong>
            <span> {patient?.surname}</span>
          </Text>
        </MenuButton>
      </Tooltip>

      {/* Content menu */}
      <Portal>
        <MenuList minW="20em" boxShadow="lg" zIndex={9999999999}>
          {itemsList.map((item) => (
            <>
              {item?.divider && <Divider />}
              <Item
                icon={item?.icon}
                intitule={item?.intitule}
                color={item?.color}
                textColor={item?.textColor}
                func={item?.func}
              />
            </>
          ))}
        </MenuList>
      </Portal>
    </Menu>
  );
}

EventContent.propTypes = {
  event: PropTypes.shape().isRequired,
};

export default EventContent;
