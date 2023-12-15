import * as types from './types';

export const getPraticiens = (payload) => ({
  type: types.GET_PRATICIENS_REQUEST,
  payload,
});

export const saveCheckedPractitioners = (payload) => ({
  type: types.SAVE_CHECKED_PRACTITIONERS,
  payload,
});

export const getAllPraticiens = (payload) => ({
  type: types.GET_ALL_PRATICIENS_REQUEST,
  payload,
});

export const postPraticien = (praticien) => ({
  type: types.POST_PRATICIEN_REQUEST,
  praticien,
});

export const updatePraticien = (praticien) => ({
  type: types.UPDATE_PRATICIEN_REQUEST,
  praticien,
});

export const deletePraticien = (id) => ({
  type: types.DELETE_PRATICIEN_REQUEST,
  id,
});

export const searchPraticien = (wordKey) => ({
  type: types.SEARCH_PRATICIEN_REQUEST,
  wordKey
});
