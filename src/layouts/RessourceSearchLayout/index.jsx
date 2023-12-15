import React from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import FormGenerator from '../FormGenerator';

function RessourceSearchLayout({ data,type, cle,  handlePost, handleClearSearchForm }) {

  return (
    <Accordion allowToggle>
      <AccordionItem>
        <h2>
          <AccordionButton
            _hover={{ backgroundColor: '#2c3e50' }}
            backgroundColor="#2c3e50"
          >
            <Box as="span" flex="1" textAlign="left" __css={{ color: 'white' }}>
              Recherche d'un utilisateur
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4} w="100%">
          <Grid templateColumns="repeat(7, 1fr)" gap={4}>
            <GridItem colStart={2} colEnd={6} rowStart={1}>
              <FormGenerator
                type={type}
                handleClearSearchForm={() => handleClearSearchForm()}
                handlePost={handlePost}
                cle={cle}
                data={data}
              />
            </GridItem>
          </Grid>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

RessourceSearchLayout.propTypes = {
  handlePost: PropTypes.func,
  data: PropTypes.shape(),
  handleClearSearchForm: PropTypes.func,
};

RessourceSearchLayout.defaultProps = {
  handlePost: undefined,
  data: {},
  handleClearSearchForm: undefined,
};

export default RessourceSearchLayout;
