import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Grid, GridItem } from '@chakra-ui/react';
import { upsertStructure } from '../../utils/data';
import FormGenerator from '../../layouts/FormGenerator';

const formatData = (data) => ({
  name: data?.nom,
  typeCentre: data?.typeCentre,
  addresse: data?.addresse,
  email: data?.email,
  telephone: data?.telephone,
  raisonSocial: data?.raisonSocial,
  longitude: 0,
  latitude: 0,
  _id: data?._id,
});

function StructurePage() {
  const [data] = useState(upsertStructure);
  const structure = useSelector((state) => state.Common.structure);
  return (
    <Grid templateColumns="repeat(7, 1fr)" gap={4} mt={10} mb={20}>
      <GridItem colStart={2} colEnd={6} rowStart={1}>
        <FormGenerator editeData={formatData(structure)} data={data} />
      </GridItem>
    </Grid>
  );
}

export default StructurePage;
