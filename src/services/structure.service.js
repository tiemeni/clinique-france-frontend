import { getUnauthRequest } from '../utils/api';

const { REACT_APP_BASE_URL } = process.env;

export const getStructures = async () => {
  try {
    const res = await getUnauthRequest(`${REACT_APP_BASE_URL}/structure/`);
    return res;
  } catch (err) {
    return err;
  }
};

export const somethingElse = async () => {
  try {
    console.log('good');
  } catch (error) {
    console.error(error);
  }
};
