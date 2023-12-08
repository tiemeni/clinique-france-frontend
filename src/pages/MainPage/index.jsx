import React, { useEffect } from 'react';
import { Box, HStack, IconButton } from '@chakra-ui/react';
import { UilAngleDoubleRight } from '@iconscout/react-unicons';
import { useDispatch, useSelector } from 'react-redux';
import Calendar from '../../components/Calendar';
import MenuPraticien from '../../components/MenuPraticien';
import { useDimensions } from '../../hooks/useDimensions';
import { getPraticiens } from '../../redux/praticiens/actions';
import { closePraticienPanel, verifyToken } from '../../redux/common/actions';


function MainPage() {
  const { innerHeight, innerWidth } = useDimensions();
  const dispatch = useDispatch();
  const showPratDrawer = useSelector(state => state.Common.showPratDrawer);

  useEffect(() => {
    dispatch(getPraticiens());
    dispatch(verifyToken(false))
  }, []);
  

  return (
    <HStack minW="full" alignItems="flex-start" h={innerHeight}>
      {(showPratDrawer === undefined ? innerWidth > 1200 : showPratDrawer) && 
      <MenuPraticien />
      }
      <Box overflow="auto" h="full">
      {!(showPratDrawer === undefined ? innerWidth > 1200 : showPratDrawer) && <IconButton
          size="sm"
          onClick={() => dispatch(closePraticienPanel(true))}
          variant="unstyled"
          icon={<UilAngleDoubleRight size="50" color="#04B7C9" />}
        />}
        <Calendar />
      </Box>
    </HStack>
  );
}

export default MainPage;
