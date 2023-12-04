import React from 'react';
import { HStack, Icon, MenuItem, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';

function Item(props) {
  const { icon, intitule, color,func, textColor } = props;
  return (
    <MenuItem onClick={func}>
      <HStack w="full" gap={4}>
        <Icon as={icon} color={color} fontSize="xl" />
        <Text color={textColor} fontSize="small">{intitule}</Text>
      </HStack>
    </MenuItem>
  );
}

Item.propTypes = {
  icon: PropTypes.element.isRequired,
  intitule: PropTypes.string.isRequired,
  color: PropTypes.string,
  func: PropTypes.func,
  textColor: PropTypes.string
};

Item.defaultProps = {
  color: 'primary.500',
  func: console.log('clicked'),
  textColor: 'grey.900'
};

export default Item;
