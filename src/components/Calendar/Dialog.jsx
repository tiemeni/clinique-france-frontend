import React from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogOverlay,
  Avatar,
  Box,
  Button,
  HStack,
  Icon,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { UilTrashAlt, UilExclamationTriangle } from '@iconscout/react-unicons';
import { useDispatch, useSelector } from 'react-redux';
import { onDateSelected, onOpenDialog } from '../../redux/common/actions';
import { onDeleteAppointment } from '../../redux/appointments/actions';
import { dialogMode } from '../../utils/variables/common';

function Dialog() {
  const dispatch = useDispatch();
  const cancelRef = React.useRef();
  const { openDeletion, eventId, mode, dateSelected } = useSelector(
    (state) => state.Common,
  );
  const { deleting, isDeleted, isFailed } = useSelector(
    (state) => state.Appointments,
  );
  const onClose = () => dispatch(onOpenDialog({ open: false, idRdv: '' }));
  const toast = useToast();

  const onDelete = () => {
    if (mode === dialogMode.ALERT) {
      dispatch(onOpenDialog({ open: false, idRdv: '', dateSelected }));
      dispatch(onDateSelected({ date: dateSelected, isOpen: true, mode: "create" }));
      return;
    }
    dispatch(onDeleteAppointment(eventId));
  };

  const loadingText = (
    <Text fontSize="sm" fontWeight="normal">
      Patientez...
    </Text>
  );

  React.useEffect(() => {
    if (isDeleted || (!isDeleted && isFailed)) {
      const status = !isDeleted && isFailed ? 'danger' : 'success';
      const titleText = isDeleted
        ? `Le rendez-vous a bien été supprimé`
        : 'Une erreur est survenue lors de la mise à jour du rendez-vous';
      const title = <Text fontSize="sm">{titleText}</Text>;
      onClose();
      toast({
        title,
        status,
        variant: 'solid',
        position: 'top-right',
        isClosable: true,
      });
    }
  }, [isDeleted]);

  return (
    <AlertDialog
      isOpen={openDeletion}
      onClose={onClose}
      leastDestructiveRef={cancelRef}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent pt={5}>
          <AlertDialogCloseButton />

          <AlertDialogBody>
            <VStack gap={5}>
              <VStack>
                <Avatar
                  bg={mode === dialogMode.DELETE ? 'gray.100' : 'secondary.200'}
                  icon={
                    <Icon
                      as={
                        mode === dialogMode.DELETE
                          ? UilTrashAlt
                          : UilExclamationTriangle
                      }
                      boxSize="16"
                      color={
                        mode === dialogMode.DELETE
                          ? 'primary.500'
                          : 'secondary.500'
                      }
                    />
                  }
                  size="xl"
                />
                <Text fontWeight="bold">
                  {mode === dialogMode.DELETE
                    ? 'Supprimer un rendez-vous'
                    : 'Attention'}
                </Text>
              </VStack>
              <Text color="gray.500" fontSize="sm" align="center">
                {mode === dialogMode.DELETE
                  ? 'Êtes-vous sûre de vouloir supprimer ce rendez-vous?'
                  : 'Vous-êtes sur le point de prendre un rendez-vous dans le passé.'}
              </Text>
              {mode === dialogMode.DELETE && (
                <Box
                  bg="orange.50"
                  w="full"
                  p={3}
                  rounded={10}
                  borderLeftWidth="thick"
                  borderLeftColor="red.500"
                >
                  <HStack alignItems="flex-start">
                    <Icon
                      as={UilExclamationTriangle}
                      boxSize={5}
                      color="red.500"
                    />
                    <Box>
                      <Text fontSize="sm" fontWeight="bold" color="red.500">
                        Attention
                      </Text>
                      <Text fontSize="sm" color="red.500">
                        Vous ne pourrez pas annuler cette action par la suite.
                      </Text>
                    </Box>
                  </HStack>
                </Box>
              )}
            </VStack>
          </AlertDialogBody>

          <AlertDialogFooter justifyContent="center">
            <Button onClick={onClose} ref={cancelRef} isDisabled={deleting}>
              <Text fontSize="sm">Annuler</Text>
            </Button>
            <Button
              isLoading={deleting}
              colorScheme={mode === dialogMode.DELETE ? 'red' : 'primary'}
              ml={3}
              onClick={onDelete}
              loadingText={loadingText}
            >
              <Text fontSize="sm">
                {mode === dialogMode.DELETE ? 'Supprimer ' : 'Continuer'}
              </Text>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

export default Dialog;
