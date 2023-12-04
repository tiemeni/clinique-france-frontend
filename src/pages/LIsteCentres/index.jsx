import React, { useEffect, useState } from 'react';
import { Container, Grid, Heading } from '@chakra-ui/react';
import CardCenter from '../../components/CardCenter';
import { getStructures } from '../../services/structure.service';

const spacing = 5;

function ListeCentres() {
  const [listCentres, setListeCentres] = useState([]);

  useEffect(() => {
    getStructures().then((res) => {
      setListeCentres(res.data);
    });
  }, []);

  return (
    <Container minW="full" padding={spacing}>
      <Heading as="h1" size="lg" fontWeight="semibold" color="dark.500">
        Les structures
      </Heading>
      <Grid gap={spacing} mt={spacing} templateColumns="repeat(3, 1fr)">
        {listCentres?.map((centre) => (
          <CardCenter
            key={centre?._id}
            nom={centre.nom}
            _id={centre._id}
            telephone={centre.telephone}
          />
        ))}
      </Grid>
    </Container>
  );
}

export default ListeCentres;
