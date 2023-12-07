import React from 'react';
import PropTypes from 'prop-types';
import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Checkbox,
  HStack,
  IconButton,
  Text,
  VStack,
} from '@chakra-ui/react';
import { UilPlus } from '@iconscout/react-unicons';
import MenuItemChild from './menu-Item-child';
import { formatUserName } from '../../utils/helpers';

const _spacing = 3;
const _iconSize = 20;

function MenuItem(props) {
  const { professionName, selectedPractitioners, data, handleSelection } =
    props;

  // Add or remove ids when checkbox is checked or not
  const handleChange = (e) => {
    const isChecked = e.target.checked;
    const tabIds = [];
    const tabNames = [];
    data.forEach(({ _id, name, surname }) => {
      tabIds.push(_id);
      tabNames.push(formatUserName(name, surname));
    });
    if (isChecked) handleSelection(tabIds, tabNames);
    else handleSelection(tabIds, tabNames, 'remove');
  };
  console.log('========= > ', data);

  return (
    <AccordionItem>
      <HStack alignItems="center">
        <Checkbox onChange={handleChange} size="md" colorScheme="primary" />
        <AccordionButton
          px={0}
          _hover={{ bg: 'transparent' }}
          _expanded={{ borderBottomWidth: 1, borderBottomColor: 'primary.200' }}
        >
          <HStack w="full" justifyContent="space-between">
            <Text
              fontSize="sm"
              textTransform="uppercase"
              color="primary.500"
              fontWeight="semibold"
            >
              {professionName}
            </Text>

            <IconButton
              onClick={(e) => e.stopPropagation()}
              size="xs"
              variant="ghost"
              icon={<UilPlus color="black" size={_iconSize} />}
            />
          </HStack>
        </AccordionButton>
      </HStack>
      <AccordionPanel py={_spacing} px={0}>
        <VStack spacing={_spacing}>
          {data.map((practitioner) => (
            <MenuItemChild
              key={practitioner._id}
              name={practitioner.name}
              surname={practitioner.surname}
              _id={practitioner._id}
              defaultChecked={selectedPractitioners.includes(practitioner._id)}
              handleSelection={handleSelection}
            />
          ))}
        </VStack>
      </AccordionPanel>
    </AccordionItem>
  );
}

MenuItem.propTypes = {
  professionName: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
    }),
  ).isRequired,
  selectedPractitioners: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleSelection: PropTypes.func.isRequired,
};

export default MenuItem;
