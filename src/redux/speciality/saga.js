import { put, takeLatest } from 'redux-saga/effects';
import * as types from './types';
import {
  deleteUnauthRequest,
  getUnauthRequest,
  patchUnauthRequest,
  postUnauthRequest,
} from '../../utils/api';
import { SHOW_MODAL_DEL_RESSOURCE } from '../common/types';

/**
 * @description ici le saga reducer
 */

function* getAllSpecialities() {
  const idc = localStorage.getItem('idc');
  try {
    const result = yield getUnauthRequest(
      `${process.env.REACT_APP_BASE_URL}/specialites/?idCentre=${idc}`,
    );
    if (result.success) {
      yield put({
        type: types.GET_ALL_SPECIALITIES_SUCCESS,
        payload: result.data,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
}

function* postSpecialities({ spec }) {
  const idc = localStorage.getItem('idc');
  const payload = {
    secretaryAlert: spec?.secretaryAlert,
    title: spec?.title,
    webAlert: spec?.webAlert,
    active: spec?.active || true,
    label: spec?.label,
    reference: spec?.reference,
  };
  try {
    const result = yield postUnauthRequest(
      `${process.env.REACT_APP_BASE_URL}/specialites/?idCentre=${idc}`,
      payload,
    );
    if (result.success) {
      yield put({
        type: types.POST_SPEC_REQUEST_SUCCESS,
      });
      yield put({ type: types.GET_ALL_SPECIALITIES });
      window.history.back();
    }
  } catch (error) {
    console.log(error.message);
    yield put({ type: types.POST_SPEC_REQUEST_FAILED, payload: error.message });
  }
}

function* updateSpec({ spec }) {
  const idc = localStorage.getItem('idc');
  const payload = {
    idProfession: spec.idProfession,
    label: spec.label,
    reference: spec.reference,
    secretaryAlert: spec.secretaryAlert,
    title: spec.title,
    webAlert: spec.webAlert,
  };
  try {
    const result = yield patchUnauthRequest(
      `${process.env.REACT_APP_BASE_URL}/specialites/${spec?._id}/?idCentre=${idc}`,
      payload,
    );
    if (result.success) {
      yield put({
        type: types.UPDATE_SPECIALITY_REQUEST_SUCCESS,
      });
      yield put({ type: types.GET_ALL_SPECIALITIES });
      window.history.back();
    } else {
      yield put({
        type: types.UPDATE_SPECIALITY_REQUEST_FAILED,
        payload: result.message,
      });
    }
  } catch (error) {
    yield put({
      type: types.UPDATE_SPECIALITY_REQUEST_FAILED,
      payload: error.message,
    });
  }
}

function* deleteSpec({ id }) {
  const idc = localStorage.getItem('idc');
  try {
    const result = yield deleteUnauthRequest(
      `${process.env.REACT_APP_BASE_URL}/specialites/${id}?idCentre=${idc}`,
    );
    if (result.success) {
      yield put({
        type: types.DELETE_SPEC_REQUEST_SUCCESS,
      });
      yield put({ type: SHOW_MODAL_DEL_RESSOURCE, truth: false });
      yield put({ type: types.GET_ALL_SPECIALITIES });
    } else {
      yield put({
        type: types.DELETE_SPEC_REQUEST_FAILED,
        payload: result.message,
      });
    }
  } catch (error) {
    yield put({
      type: types.DELETE_SPEC_REQUEST_FAILED,
      payload: error.message,
    });
  }
}

export default function* SpecialitySaga() {
  yield takeLatest(types.GET_ALL_SPECIALITIES, getAllSpecialities);
  yield takeLatest(types.POST_SPEC_REQUEST, postSpecialities);
  yield takeLatest(types.UPDATE_SPECIALITY_REQUEST, updateSpec);
  yield takeLatest(types.DELETE_SPEC_REQUEST, deleteSpec);
}
