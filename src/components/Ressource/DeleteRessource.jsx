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
} from '@chakra-ui/react';
import { UilTrashAlt, UilExclamationTriangle } from '@iconscout/react-unicons';
import { useSelector } from 'react-redux';

function DeleteRessourceDialogue({ open, onClose, title, body, onDelete }) {
  const cancelRef = React.useRef();
  const deletingUser = useSelector((state) => state.User.deletingUser);
  const deletingSpecialities = useSelector(
    (state) => state.Specialities.deletingSpecialities,
  );
  const deletingPraticien = useSelector(
    (state) => state.Praticiens.deletingPraticien,
  );
  const deletingLieuLoading = useSelector(
    (state) => state.Lieux.deletingLieuLoading,
  );
  const deletingPatient = useSelector((state) => state.Patient.deletingPatient);
  const deletingMotif = useSelector((state) => state.Motifs.deletingMotif);
  const deletingConsigne = useSelector((state) => state.Consignes.deletingConsigne);

  return (
    <AlertDialog
      isOpen={open}
      onClose={() => onClose()}
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
                  bg="gray.100"
                  icon={
                    <Icon as={UilTrashAlt} boxSize="16" color="primary.500" />
                  }
                  size="xl"
                />
                <Text fontWeight="bold">{title}</Text>
              </VStack>
              <Text color="gray.500" fontSize="sm" align="center">
                {body}
              </Text>
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
            </VStack>
          </AlertDialogBody>

          <AlertDialogFooter justifyContent="center">
            <Button
              onClick={() => onClose()}
              ref={cancelRef}
              isDisabled={false}
            >
              <Text fontSize="sm">Annuler</Text>
            </Button>
            <Button
              isLoading={
                deletingUser ||
                deletingSpecialities ||
                deletingPraticien ||
                deletingLieuLoading ||
                deletingPatient ||
                deletingMotif ||
                deletingConsigne
              }
              onClick={() => onDelete()}
              colorScheme="red"
              ml={3}
              loadingText="loading..."
            >
              <Text fontSize="sm">Supprimer</Text>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

export default DeleteRessourceDialogue;
