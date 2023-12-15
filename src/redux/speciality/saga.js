import { put, takeLatest } from 'redux-saga/effects';
import * as types from './types';
import {
  deleteUnauthRequest,
  getUnauthRequest,
  patchUnauthRequest,
  postUnauthRequest,
} from '../../utils/api';
import { SHOW_MODAL_DEL_RESSOURCE } from '../common/types';

const { REACT_APP_BASE_URL } = process.env;

/**
 * @description ici le saga reducer
 */

function* getAllSpecialities() {
  try {
    const result = yield getUnauthRequest(
      `${process.env.REACT_APP_BASE_URL}/specialites/`,
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
      `${process.env.REACT_APP_BASE_URL}/specialites/`,
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
      `${process.env.REACT_APP_BASE_URL}/specialites/${spec?._id}/`,
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
  try {
    const result = yield deleteUnauthRequest(
      `${process.env.REACT_APP_BASE_URL}/specialites/${id}`,
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

function* searchSpeciality({ wordKey }){
  const url1 = `${REACT_APP_BASE_URL}/specialites/search?webAlert=${wordKey.webAlert}&title=${wordKey?.title}`;
  try {
    const result = yield getUnauthRequest(url1);

    if (result.success) {
      yield put({ type: types.SEARCH_SPECIALITY_SUCCESS, payload: result.data });
    } else {
      yield put({ type: types.SEARCH_SPECIALITY_FAILLED, payload: result.message });
    }
  } catch (error) {
    yield put({ type: types.SEARCH_SPECIALITY_FAILLED, payload: error.message });
  }
}

export default function* SpecialitySaga() {
  yield takeLatest(types.GET_ALL_SPECIALITIES, getAllSpecialities);
  yield takeLatest(types.POST_SPEC_REQUEST, postSpecialities);
  yield takeLatest(types.UPDATE_SPECIALITY_REQUEST, updateSpec);
  yield takeLatest(types.DELETE_SPEC_REQUEST, deleteSpec);
  yield takeLatest(types.SEARCH_SPECIALITY_REQUEST, searchSpeciality);
}
