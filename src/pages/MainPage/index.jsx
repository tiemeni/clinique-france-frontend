import React, { useLayoutEffect } from 'react';
import { Box, HStack } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import Calendar from '../../components/Calendar';
import MenuPraticien from '../../components/MenuPraticien';
import { useDimensions } from '../../hooks/useDimensions';
import { getPraticiens } from '../../redux/praticiens/actions';

function MainPage() {
  const { innerHeight } = useDimensions();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(getPraticiens());
  }, []);

  return (
    <HStack minW="full" alignItems="flex-start" h={innerHeight}>
      <MenuPraticien />
      <Box overflow="auto" h="full">
        <Calendar />
      </Box>
    </HStack>
  );
}

export default MainPage;
