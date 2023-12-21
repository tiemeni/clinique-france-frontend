import { put, takeLatest } from 'redux-saga/effects';
import * as types from './types';
import { deleteUnauthRequest, getUnauthRequest, patchUnauthRequest, postUnauthRequest } from '../../utils/api';
import { SHOW_MODAL_DEL_RESSOURCE } from '../common/types';

/**
 * @description ici le saga reducer
 */

function* getAllConsignes() {
  try {
    const result = yield getUnauthRequest(
      `${process.env.REACT_APP_BASE_URL}/consignes/`,
    );
    if (result.success) {
      yield put({ type: types.GET_ALL_CONSIGNES_SUCCESS, payload: result.data });
    }
  } catch (error) {
    yield put({ type: types.GET_ALL_CONSIGNES_FAILED, payload: error.message });
    console.log(error.message);
  }
}

function* createConsignes({ consigne }) {
    const payload = {
        label: consigne.label,
        content: consigne.content
    };
    try {
      const result = yield postUnauthRequest(
        `${process.env.REACT_APP_BASE_URL}/consignes/`,
        payload,
      );
      if (result.success) {
        yield put({ type: types.CREATE_CONSIGNE_SUCCESS });
        yield put({ type: types.GET_ALL_CONSIGNES });
        window.history.back();
      }
    } catch (error) {
      console.log(error.message);
      yield put({ type: types.CREATE_CONSIGNE_FAILED, payload: error.message });
    }
  }

  function* updateConsignes({ consigne }) {
    const payload = {
      label: consigne.label,
      content: consigne.content,
    };
    try {
      const result = yield patchUnauthRequest(
        `${process.env.REACT_APP_BASE_URL}/consignes/${consigne?._id}/`,
        payload,
      );
      if (result.success) {
        yield put({
          type: types.UPDATE_CONSIGNE_SUCCESS,
        });
        yield put({ type: types.GET_ALL_CONSIGNES });
        window.history.back();
      } else {
        yield put({
          type: types.UPDATE_CONSIGNE_FAILED,
          payload: result.message,
        });
      }
    } catch (error) {
      yield put({
        type: types.UPDATE_CONSIGNE_FAILED,
        payload: error.message,
      });
    }
  }

  function* deleteConsignes({ id }) {
    try {
      const result = yield deleteUnauthRequest(
        `${process.env.REACT_APP_BASE_URL}/consignes/${id}`,
      );
      if (result.success) {
        yield put({
          type: types.DELETE_CONSIGNE_SUCCESS,
        });
        yield put({ type: SHOW_MODAL_DEL_RESSOURCE, truth: false });
        yield put({ type: types.GET_ALL_CONSIGNES });
      } else {
        yield put({
          type: types.DELETE_CONSIGNE_FAILED,
          payload: result.message,
        });
      }
    } catch (error) {
      yield put({
        type: types.DELETE_CONSIGNE_FAILED,
        payload: error.message,
      });
    }
  }


export default function* ConsignesSaga() {
  yield takeLatest(types.GET_ALL_CONSIGNES, getAllConsignes);
  yield takeLatest(types.CREATE_CONSIGNE, createConsignes);
  yield takeLatest(types.UPDATE_CONSIGNE, updateConsignes);
  yield takeLatest(types.DELETE_CONSIGNE, deleteConsignes);
}
