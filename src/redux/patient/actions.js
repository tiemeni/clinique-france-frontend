import {
  DELETE_PATIENT_REQUEST,
  GET_ALL_PATIENT,
  POST_PATIENT_REQUEST,
  UPDATE_PATIENT_REQUEST,
} from './types';

export const getAllPatients = () => ({
  type: GET_ALL_PATIENT,
});

export const postPatient = (patient) => ({
  type: POST_PATIENT_REQUEST,
  patient,
});

export const updatePatient = (patient) => ({
  type: UPDATE_PATIENT_REQUEST,
  patient,
});

export const deletePatient = (id) => ({
  type: DELETE_PATIENT_REQUEST,
  id,
});
