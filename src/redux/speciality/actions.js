import {
  DELETE_SPEC_REQUEST,
  GET_ALL_SPECIALITIES,
  POST_SPEC_REQUEST,
  SEARCH_SPECIALITY_REQUEST,
  UPDATE_SPECIALITY_REQUEST,
} from './types';

export const getAllSpecialities = () => ({
  type: GET_ALL_SPECIALITIES,
});

export const postSpeciality = (spec) => ({
  type: POST_SPEC_REQUEST,
  spec,
});

export const updateSpec = (spec) => ({
  type: UPDATE_SPECIALITY_REQUEST,
  spec,
});

export const deleteSpec = (id) => ({
  type: DELETE_SPEC_REQUEST,
  id,
});

export const searchSpeciality = (wordKey) => ({
  type: SEARCH_SPECIALITY_REQUEST,
  wordKey
})
