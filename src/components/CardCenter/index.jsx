import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardBody,
  CardHeader,
  Link,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react';

function CardCenter(props) {
  const { nom, telephone, _id } = props;
  return (
    <Card w="full">
      <CardHeader bg="primary.500" textAlign="left">
        <Text color="white">{`${nom} (${_id})`}</Text>
      </CardHeader>
      <CardBody>
        <UnorderedList fontSize="sm">
          <ListItem color="blue.500">
            <Link href={`/?idc=${_id}`}>Backoffice</Link>
          </ListItem>
          <ListItem color="blue.500">
            <Link href="/content">Lien backoffice propre</Link>
          </ListItem>
          <ListItem>
            <Link href="/widget">Widget prise de rendez-vous</Link>
          </ListItem>
          <ListItem>
            <Text>Tel: {telephone}</Text>
          </ListItem>
          <ListItem>
            <Text>Module externe:</Text>
          </ListItem>
        </UnorderedList>
      </CardBody>
    </Card>
  );
}

CardCenter.propTypes = {
  _id: PropTypes.string.isRequired,
  nom: PropTypes.string.isRequired,
  telephone: PropTypes.string,
};

CardCenter.defaultProps = {
  telephone: '',
};

export default CardCenter;
