import {
  DELETE_LIEU_REQUEST,
  GET_ALL_LIEUX,
  POST_LIEU_REQUEST,
  UPDATE_LIEU_REQUEST,
} from './types';

export const getAllLieux = () => ({
  type: GET_ALL_LIEUX,
});

export const postLieuCallout = (lieu) => ({
  type: POST_LIEU_REQUEST,
  lieu,
});

export const updateLieu = (lieu) => ({
  type: UPDATE_LIEU_REQUEST,
  lieu,
});

export const deleteLieu = (id) => ({
  type: DELETE_LIEU_REQUEST,
  id,
});
