import { put, takeLatest } from 'redux-saga/effects';
import * as types from './types';
import {
  deleteUnauthRequest,
  getUnauthRequest,
  postUnauthRequest,
  putUnauthRequest,
} from '../../utils/api';
import { SHOW_MODAL_DEL_RESSOURCE } from '../common/types';

/**
 * @description ici le saga reducer
 */

function* getAllPatients() {
  try {
    const result = yield getUnauthRequest(
      `${process.env.REACT_APP_BASE_URL}/patients/`,
    );
    if (result.success) {
      yield put({ type: types.GET_ALL_PATIENT_SUCCESS, payload: result.data });
    } else {
      yield put({
        type: types.GET_ALL_PATIENT_FAILED,
        payload: result.message,
      });
    }
  } catch (error) {
    console.log(error.message);
    yield put({ type: types.GET_ALL_PATIENT_FAILED, payload: error.message });
  }
}
function* postPatient({ patient }) {
  const payload = {
    civility: patient?.civility,
    name: patient.name,
    surname: patient.surname,
    birthdate: patient.birthdate,
    telephone: patient.telephone,
    email: patient.email,
    initiales: patient.initiales,
    active: patient.active ? 1 : 2,
  };
  try {
    const result = yield postUnauthRequest(
      `${process.env.REACT_APP_BASE_URL}/patients/register/`,
      payload,
    );
    if (result.success) {
      yield put({
        type: types.POST_PATIENT_REQUEST_SUCCESS,
      });
      yield put({ type: types.GET_ALL_PATIENT });
      window.history.back();
    } else {
      yield put({
        type: types.POST_PATIENT_REQUEST_FAILED,
        payload: `cet utilisateur existe deja ou une erreur s'est produite ${result.message}`,
      });
    }
  } catch (error) {
    yield put({
      type: types.POST_PATIENT_REQUEST_FAILED,
      payload: error.message,
    });
  }
}

function* updatePatient({ patient }) {
  const payload = {
    civility: patient?.civility,
    name: patient.name,
    surname: patient.surname,
    birthdate: patient.birthdate,
    telephone: patient.telephone,
    email: patient.email,
    initiales: patient.initiales,
    active: patient.active === '1',
  };
  try {
    const result = yield putUnauthRequest(
      `${process.env.REACT_APP_BASE_URL}/patients/${patient?._id}/`,
      payload,
    );
    if (result.success) {
      yield put({
        type: types.UPDATE_PATIENT_REQUEST_SUCCESS,
      });
      yield put({ type: types.GET_ALL_PATIENT });
      window.history.back();
    } else {
      yield put({
        type: types.UPDATE_PATIENT_REQUEST_FAILED,
        payload: result.message,
      });
    }
  } catch (error) {
    yield put({
      type: types.UPDATE_PATIENT_REQUEST_FAILED,
      payload: error.message,
    });
  }
}

function* deletePatient({ id }) {
  try {
    const result = yield deleteUnauthRequest(
      `${process.env.REACT_APP_BASE_URL}/patients/${id}`,
    );
    if (result.success) {
      yield put({
        type: types.DELETE_PATIENT_REQUEST_SUCCESS,
      });
      yield put({ type: SHOW_MODAL_DEL_RESSOURCE, truth: false });
      yield put({ type: types.GET_ALL_PATIENT });
    } else {
      yield put({
        type: types.DELETE_PATIENT_REQUEST_FAILED,
        payload: result.message,
      });
    }
  } catch (error) {
    yield put({
      type: types.DELETE_PATIENT_REQUEST_FAILED,
      payload: error.message,
    });
  }
}

function* searchPatient({ patient }) {
  const result = yield getUnauthRequest(`${process.env.REACT_APP_BASE_URL}/patients/search?email=${patient?.email}&surname=${patient?.nom}`);
  console.log(result)

 try {
  if(result.success){
    console.log('sucess ...')
    yield put({type: types.SEARCH_PATIENT_SUCCESS, payload: result.data});
  }else{
    yield put({ type: types.SEARCH_PATIENT_FAILLED, payload: result.message})
  }
 } catch (error) {
  yield put({ type: types.SEARCH_PATIENT_FAILLED, payload: error.message})
 }
}


export default function* PatientSaga() {
  yield takeLatest(types.GET_ALL_PATIENT, getAllPatients);
  yield takeLatest(types.POST_PATIENT_REQUEST, postPatient);
  yield takeLatest(types.UPDATE_PATIENT_REQUEST, updatePatient);
  yield takeLatest(types.DELETE_PATIENT_REQUEST, deletePatient);
  yield takeLatest(types.SEARCH_PATIENT_REQUEST, searchPatient);
}
