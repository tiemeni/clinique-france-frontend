import React, { useEffect, useState } from 'react';
import {
  Checkbox,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { UilCog } from '@iconscout/react-unicons';
import PropTypes from 'prop-types';
import { formatUserName } from '../../utils/helpers';

const _spacing = 3;
const _iconSizesm = 16;

function MenuItemChild(props) {
  const { name, surname, _id, defaultChecked, handleSelection } = props;
  const [isChecked, setIsChecked] = useState(defaultChecked);

  const handleChange = (e) => {
    const { checked } = e.target;
    setIsChecked(checked);
    if (!checked) {
      handleSelection([_id], [formatUserName(name, surname)], 'remove');
      return;
    }
    handleSelection([_id], [formatUserName(name, surname)]);
  };

  const handleUncheckOthers = () => {
    handleSelection([_id], [formatUserName(name, surname)], 'uncheckOthers');
  };

  useEffect(() => {
    setIsChecked(defaultChecked);
  }, [defaultChecked]);

  return (
    <HStack w="full" gap={_spacing}>
      <HStack gap={_spacing - 1}>
        <Checkbox
          onChange={handleChange}
          size="md"
          colorScheme="primary"
          isChecked={isChecked}
        />
        <Text
          color="dark.500"
          fontSize="sm"
          overflow="hidden"
          textOverflow="ellipsis"
          noOfLines={1}
          cursor="pointer"
          onClick={handleUncheckOthers}
          w="full"
        >
          {`${formatUserName(name, surname)}`}
        </Text>
      </HStack>
      <HStack spacing={0}>
        <Menu gutter={0}>
          <MenuButton
            as={IconButton}
            size="xs"
            variant="unstyled"
            icon={<UilCog color="#04B7C9" size={_iconSizesm} />}
          />
          <MenuList minW="12em" zIndex={10}>
            <MenuItem>
              <Link to={`/content/praticien/upsert/${_id}`}>
              <Text fontSize="sm">Fiche praticien</Text>
              </Link>
            </MenuItem>
            <MenuItem>
              <Text fontSize="sm">Consignes</Text>
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </HStack>
  );
}

MenuItemChild.propTypes = {
  name: PropTypes.string.isRequired,
  surname: PropTypes.string,
  _id: PropTypes.string.isRequired,
  defaultChecked: PropTypes.bool.isRequired,
  handleSelection: PropTypes.func.isRequired,
};

MenuItemChild.defaultProps = {
  surname: '',
};

export default MenuItemChild;
