import {
  DELETE_MOTIF_REQUEST,
  GET_ALL_MOTIFS,
  GET_MOTIFS_BY_SPECS,
  POST_MOTIF_REQUEST,
  UPDATING_MOTIF_REQUEST,
  SEARCH_MOTIF_REQUEST
} from './types';

export const getAllMotifs = () => ({
  type: GET_ALL_MOTIFS,
});

export const postMotif = (motif) => ({
  type: POST_MOTIF_REQUEST,
  motif,
});

export const updateMotif = (motif) => ({
  type: UPDATING_MOTIF_REQUEST,
  motif,
});

export const deleteMotif = (id) => ({
  type: DELETE_MOTIF_REQUEST,
  id,
});

export const getMotifsByIdSpec = id => ({
  type: GET_MOTIFS_BY_SPECS,
  id
})

export const searchMotif = (wordKey) => ({
  type: SEARCH_MOTIF_REQUEST,
  wordKey
})
