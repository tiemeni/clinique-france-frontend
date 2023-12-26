import { CREATE_CONSIGNE, DELETE_CONSIGNE, GET_ALL_CONSIGNES, SEARCH_CONSIGNE_REQUEST, UPDATE_CONSIGNE } from "./types";

export const getAllConsignes = () => ({
  type: GET_ALL_CONSIGNES,
});

export const updateConsigne = (consigne) => ({
  type: UPDATE_CONSIGNE,
  consigne
});

export const deleteConsigne = (id) => ({
  type: DELETE_CONSIGNE,
  id
});

export const createConsigne = (consigne) => ({
  type: CREATE_CONSIGNE,
  consigne
});

export const searchConsigne = (consigne) => ({
  type: SEARCH_CONSIGNE_REQUEST,
  consigne
});

