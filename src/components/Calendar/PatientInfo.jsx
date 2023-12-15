import React from 'react';
import {
  Box,
  FormControl,
  HStack,
  Icon,
  Input,
  Radio,
  RadioGroup,
  Select,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { UilInfoCircle, UilAngleRightB } from '@iconscout/react-unicons';
import { Field } from 'formik';

function PatientInfo() {
  return (
    <HStack gap={5} alignItems="flex-start">
      <VStack w="70%" alignItems="flex-start" gap={5}>
        <HStack>
          <Icon as={UilAngleRightB} size="2xl" color="gray.500" boxSize={6} />
          <Text color="gray.500" fontSize="md" fontWeight="semibold">
            Informations du patient
          </Text>
        </HStack>
        <FormControl isRequired>
          <RadioGroup colorScheme="primary">
            <HStack direction="row">
              <Radio value="1">M.</Radio>
              <Radio value="2">Mme</Radio>
            </HStack>
          </RadioGroup>
        </FormControl>
        <HStack>
          <FormControl isRequired>
            <Field
              as={Input}
              id="name"
              name="name"
              type="text"
              variant="outline"
              fontSize="sm"
              placeholder="Nom"
            />
          </FormControl>
          <FormControl isRequired>
            <Field
              as={Input}
              id="surname"
              name="surname"
              type="text"
              variant="outline"
              fontSize="sm"
              placeholder="Prenom"
            />
          </FormControl>
          <FormControl>
            <Field
              as={Input}
              id="birthname"
              name="birthname"
              type="text"
              variant="outline"
              fontSize="sm"
              placeholder="Nom de naissance"
            />
          </FormControl>
        </HStack>
        <FormControl isRequired>
          <Field
            as={Input}
            id="birthdate"
            name="birthdate"
            type="date"
            variant="outline"
            fontSize="sm"
            placeholder="Date de naissance"
          />
        </FormControl>
        <HStack w="full">
          <FormControl isRequired>
            <Field
              as={Input}
              id="address"
              name="address"
              type="text"
              variant="outline"
              fontSize="sm"
              placeholder="Adresse"
            />
          </FormControl>
          <FormControl isRequired>
            <Field
              as={Select}
              id="city"
              name="city"
              variant="outline"
              fontSize="sm"
            >
              <option value="">Sélectionnez une ville</option>
              <option value="Yaounde">Yaounde</option>
              <option value="Yaounde">Douala</option>
            </Field>
          </FormControl>
        </HStack>
        <HStack w="full">
          <FormControl isRequired>
            <Field
              as={Input}
              id="email"
              name="email"
              type="email"
              variant="outline"
              fontSize="sm"
              placeholder="Email"
            />
          </FormControl>
          <FormControl isRequired>
            <Field
              as={Input}
              id="phone"
              name="phone"
              type="tel"
              variant="outline"
              fontSize="sm"
              placeholder="Téléphone"
            />
          </FormControl>
        </HStack>
        <HStack w="full">
          <FormControl>
            <Field
              as={Input}
              id="socialNumber"
              name="socialNumber"
              type="number"
              variant="outline"
              fontSize="sm"
              placeholder="Numéro de sécurité social"
            />
          </FormControl>
          <FormControl>
            <Field
              as={Select}
              id="assurance"
              name="assurance"
              variant="outline"
              fontSize="sm"
              placeholder="Assurance"
            >
              <option value="Yaounde">assurance 1</option>
              <option value="Yaounde">assurance 2</option>
            </Field>
          </FormControl>
        </HStack>
        <HStack w="full">
          <FormControl>
            <Field
              as={Input}
              id="medecin"
              name="medecinTraitant"
              type="text"
              variant="outline"
              fontSize="sm"
              placeholder="Médecin traitant"
            />
          </FormControl>
          <FormControl>
            <Field
              as={Input}
              id="doctor-city"
              name="doctorCity"
              type="number"
              variant="outline"
              fontSize="sm"
              placeholder="Ville du médécin"
            />
          </FormControl>
        </HStack>
        <FormControl>
          <Field
            as={Textarea}
            id="remarque"
            name="remarque"
            type="textarea"
            variant="outline"
            fontSize="sm"
            placeholder="Remarque"
          />
        </FormControl>
      </VStack>

      <VStack w="40%" gap={5} alignItems="flex-start">
        <HStack>
          <Icon as={UilAngleRightB} size="2xl" color="gray.500" boxSize={6} />
          <Text color="gray.500" fontSize="md" fontWeight="semibold">
            Historique des rendez-vous
          </Text>
        </HStack>
        <Box p={5} w="full" bg="gray.100" rounded={5}>
          <HStack>
            <UilInfoCircle color="#04B7C9" />
            <Text color="primary.500" fontSize="sm">
              Aucun historique disponible
            </Text>
          </HStack>
        </Box>
      </VStack>
    </HStack>
  );
}

export default PatientInfo;
