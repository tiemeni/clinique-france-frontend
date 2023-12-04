import React from 'react';
import { Spinner, VStack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

function Loader() {
  const { showLoader } = useSelector((state) => state.Common);
  return (
    <VStack
      position="absolute"
      top="5.4em"
      left={0}
      minW="full"
      minH="full"
      height={16}
      width={16}
      bg="whiteAlpha.700"
      zIndex={9}
      visibility={showLoader ? 'visible' : 'hidden'}
    >
      <Spinner
        position="fixed"
        top="50%"
        translate="yes"
        color="secondary.500"
        thickness=".3em"
        size="lg"
        speed="0.70s"
        emptyColor="secondary.200"
      />
    </VStack>
  );
}

export default Loader;
