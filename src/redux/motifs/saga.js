import { put, takeLatest } from 'redux-saga/effects';
import * as types from './types';
import {
  deleteUnauthRequest,
  getUnauthRequest,
  postUnauthRequest,
  putUnauthRequest,
} from '../../utils/api';
import { convertIndexIntoNumber } from '../../utils/helpers';
import { SHOW_MODAL_DEL_RESSOURCE } from '../common/types';

const BASE_URL = process.env.REACT_APP_BASE_URL;

/**
 * @description ici le saga reducer
 */

function* getAllMotifs() {
  //   const idc = localStorage.getItem('idc');
  try {
    const result = yield getUnauthRequest(
      `${process.env.REACT_APP_BASE_URL}/motif/`,
    );
    if (result.success) {
      yield put({ type: types.GET_ALL_MOTIFS_SUCCESS, payload: result.data });
    } else {
      yield put({ type: types.GET_ALL_MOTIFS_FAILED, payload: result.message });
    }
  } catch (error) {
    yield put({ type: types.GET_ALL_MOTIFS_FAILED, payload: error.message });
  }
}

function* postMotif({ motif }) {
  const payload = {
    active: motif?.active === 1,
    couleur: `#${motif?.couleur}`,
    default_time: convertIndexIntoNumber(motif?.default_time),
    idLieux: [motif?.idLieux],
    idProfession: motif?.idProfession,
    label: motif?.label,
    nom: motif?.nom,
    idSpeciality: motif?.idSpeciality,
    reference: motif?.reference,
  };
  try {
    const result = yield postUnauthRequest(
      `${process.env.REACT_APP_BASE_URL}/motif/register`,
      payload,
    );
    if (result.success) {
      yield put({
        type: types.POST_MOTIF_REQUEST_SUCCESS,
      });
      yield put({ type: types.GET_ALL_MOTIFS });
      window.history.back();
    } else {
      yield put({
        type: types.POST_MOTIF_REQUEST_FAILED,
        payload: result.message,
      });
    }
  } catch (error) {
    console.log(error.message);
    yield put({
      type: types.POST_MOTIF_REQUEST_FAILED,
      payload: error.message,
    });
  }
}

function* updateMotif({ motif }) {
  const payload = {
    reference: motif.reference,
    default_time: convertIndexIntoNumber(motif.default_time),
    idProfession: motif.idProfession,
    idLieux: [motif.idLieux],
    idSpeciality: motif.idSpeciality,
    couleur: `#${motif?.couleur}`,
    nom: motif.nom,
    label: motif.label,
    initiales: motif.initiales,
    active: motif.active === '1',
  };
  try {
    const result = yield putUnauthRequest(
      `${process.env.REACT_APP_BASE_URL}/motif/${motif?._id}/`,
      payload,
    );
    if (result.success) {
      yield put({
        type: types.UPDATING_MOTIF_REQUEST_SUCCESS,
      });
      yield put({ type: types.GET_ALL_MOTIFS });
      window.history.back();
    } else {
      yield put({
        type: types.UPDATING_MOTIF_REQUEST_FAILED,
        payload: result.message,
      });
    }
  } catch (error) {
    yield put({
      type: types.UPDATING_MOTIF_REQUEST_FAILED,
      payload: error.message,
    });
  }
}

function* deleteMotif({ id }) {
  try {
    const result = yield deleteUnauthRequest(
      `${process.env.REACT_APP_BASE_URL}/motif/${id}`,
    );
    if (result.success) {
      yield put({
        type: types.DELETE_MOTIF_REQUEST_SUCCESS,
      });
      yield put({ type: SHOW_MODAL_DEL_RESSOURCE, truth: false });
      yield put({ type: types.GET_ALL_MOTIFS });
    } else {
      yield put({
        type: types.DELETE_MOTIF_REQUEST_FAILED,
        payload: result.message,
      });
    }
  } catch (error) {
    yield put({
      type: types.DELETE_MOTIF_REQUEST_FAILED,
      payload: error.message,
    });
  }
}

function* getMotifsByIdSpec({ id }) {
  try {
    const result = yield getUnauthRequest(
      `${process.env.REACT_APP_BASE_URL}/motif/speciality/${id}`,
    );
    if (result.success) {
      yield put({ type: types.GET_MOTIFS_BY_SPECS_SUCCESS, payload: result.data });
    }
  } catch (error) {
    console.log("failed gettieng motis by specs")
  }
}

function* searchMotif({ wordKey }) {
  const url1 = `${BASE_URL}/motif/search?nom=${wordKey?.nom}&couleur=${wordKey.couleur}`;
  try {
    const result = yield getUnauthRequest(url1);
    if (result.success) {
      yield put({ type: types.SEARCH_MOTIF_SUCCESS, payload: result.data });
    } else {
      yield put({ type: types.SEARCH_MOTIF_FAILLED, payload: result.message });
    }
  } catch (error) {
    yield put({ type: types.SEARCH_MOTIF_FAILLED, payload: error.message });
  }
}

export default function* MotifSaga() {
  yield takeLatest(types.GET_ALL_MOTIFS, getAllMotifs);
  yield takeLatest(types.POST_MOTIF_REQUEST, postMotif);
  yield takeLatest(types.UPDATING_MOTIF_REQUEST, updateMotif);
  yield takeLatest(types.DELETE_MOTIF_REQUEST, deleteMotif);
  yield takeLatest(types.GET_MOTIFS_BY_SPECS, getMotifsByIdSpec);
  yield takeLatest(types.SEARCH_MOTIF_REQUEST, searchMotif);
}
