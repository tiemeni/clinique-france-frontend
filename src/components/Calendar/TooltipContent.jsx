import React, { memo } from 'react';
import { HStack, Icon, Text, VStack } from '@chakra-ui/react';
import { UilGlobe, UilMobileAndroid } from '@iconscout/react-unicons';
import PropTypes from 'prop-types';

function TooltipContent(props) {
  const { motif, patient, provenance, duration } = props;
  return (
    <VStack p={2} gap={1} alignItems="flex-start">
      <Text fontSize="sm" fontWeight="semibold">
        {patient?.name} {patient?.surname}
      </Text>
      <HStack alignItems="start">
        <Text fontSize="sm" fontWeight="semibold">
          Motif:
        </Text>
        <Text fontSize="sm">{motif}</Text>
      </HStack>
      <HStack alignItems="start">
        <Text fontSize="sm" fontWeight="semibold">
          Durée:
        </Text>
        <Text fontSize="sm">{duration} min</Text>
      </HStack>
      <HStack>
        <Icon
          as={provenance === 'mobile' ? UilMobileAndroid : UilGlobe}
          fontSize="xl"
        />
        <Text fontSize="sm">Rendez-pris depuis le {provenance}</Text>
      </HStack>
    </VStack>
  );
}

TooltipContent.propTypes = {
  motif: PropTypes.string.isRequired,
  patient: PropTypes.shape({
    name: PropTypes.string.isRequired,
    surname: PropTypes.string,
  }).isRequired,
  provenance: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
};

export default memo(TooltipContent);
