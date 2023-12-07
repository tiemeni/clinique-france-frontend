import { put, takeLatest } from 'redux-saga/effects';
import * as types from './types';
import {
  deleteUnauthRequest,
  getUnauthRequest,
  postUnauthRequest,
  putUnauthRequest,
} from '../../utils/api';
import {
  convertNumberToRegion,
  convertNumberToVille,
} from '../../utils/helpers';
import { SHOW_MODAL_DEL_RESSOURCE } from '../common/types';

/**
 * @description ici le saga reducer
 */

function* getAllLieux() {
  try {
    const result = yield getUnauthRequest(
      `${process.env.REACT_APP_BASE_URL}/lieu/`,
    );
    if (result.success) {
      yield put({ type: types.GET_ALL_LIEUX_SUCCESS, payload: result.data });
    }
  } catch (error) {
    console.log(error.message);
  }
}

function* postLieu({ lieu }) {
  const payload = {
    active: lieu?.active === '1',
    codePostal: lieu?.codePostal,
    location: JSON.stringify({
      longitude: lieu.longitude,
      latitude: lieu.latitude,
    }),
    initiales: lieu?.initiales,
    label: lieu?.label,
    reference: lieu?.reference,
    region: convertNumberToRegion(lieu?.region),
    ville: convertNumberToVille(lieu?.ville),
  };
  try {
    const result = yield postUnauthRequest(
      `${process.env.REACT_APP_BASE_URL}/lieu/register/`,
      payload,
    );
    if (result.success) {
      yield put({ type: types.POST_LIEU_REQUEST_SUCCESS });
      yield put({ type: types.GET_ALL_LIEUX });
      window.history.back();
    }
  } catch (error) {
    console.log(error.message);
    yield put({ type: types.POST_LIEU_REQUEST_FAILED, payload: error.message });
  }
}

function* updateLieu({ lieu }) {
  const payload = {
    label: lieu.label,
    region: convertNumberToRegion(lieu.region),
    ville: convertNumberToVille(lieu.ville),
    reference: lieu.reference,
    initiales: lieu.initiales,
    location: JSON.stringify({
      longitude: lieu.longitude,
      latitude: lieu.latitude,
    }),
    codePostal: lieu.codePostal,
    active: lieu.active === '1',
  };
  try {
    const result = yield putUnauthRequest(
      `${process.env.REACT_APP_BASE_URL}/lieu/${lieu?._id}/`,
      payload,
    );
    if (result.success) {
      yield put({
        type: types.UPDATE_LIEU_REQUEST_SUCCESS,
      });
      yield put({ type: types.GET_ALL_LIEUX });
      window.history.back();
    } else {
      yield put({
        type: types.UPDATE_LIEU_REQUEST_FAILED,
        payload: result.message,
      });
    }
  } catch (error) {
    yield put({
      type: types.UPDATE_LIEU_REQUEST_FAILED,
      payload: error.message,
    });
  }
}

function* deleteLieu({ id }) {
  try {
    const result = yield deleteUnauthRequest(
      `${process.env.REACT_APP_BASE_URL}/lieu/${id}`,
    );
    if (result.success) {
      yield put({
        type: types.DELETE_LIEU_REQUEST_SUCCESS,
      });
      yield put({ type: SHOW_MODAL_DEL_RESSOURCE, truth: false });
      yield put({ type: types.GET_ALL_LIEUX });
    } else {
      yield put({
        type: types.DELETE_LIEU_REQUEST_FAILED,
        payload: result.message,
      });
    }
  } catch (error) {
    yield put({
      type: types.DELETE_LIEU_REQUEST_FAILED,
      payload: error.message,
    });
  }
}

export default function* LieuxSaga() {
  yield takeLatest(types.GET_ALL_LIEUX, getAllLieux);
  yield takeLatest(types.POST_LIEU_REQUEST, postLieu);
  yield takeLatest(types.UPDATE_LIEU_REQUEST, updateLieu);
  yield takeLatest(types.DELETE_LIEU_REQUEST, deleteLieu);
}
