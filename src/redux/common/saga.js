import { put, takeLatest } from 'redux-saga/effects';
import * as types from './types';
import { getUnauthRequest } from '../../utils/api';

/**
 * @description ici le saga reducer de l'evenement RESET_APP
 */

function* resetApp() {
  yield console.log('reset app saga common reducer');
}

function* getStructure() {
  try {
    const result = yield getUnauthRequest(
      `${process.env.REACT_APP_BASE_URL}/structure/`,
    );
    if (result.success) {
      yield put({
        type: types.GET_STRUCTURE_INFO_SUCCESS,
        payload: result.data,
      });
    } else {
      yield put({
        type: types.GET_STRUCTURE_INFO_FAILED,
        payload: result.message,
      });
    }
  } catch (e) {
    yield put({
      type: types.GET_STRUCTURE_INFO_FAILED,
      payload: e.message,
    });
  }
}

export default function* CommonSagas() {
  yield takeLatest(types.RESET_APP, resetApp);
  yield takeLatest(types.GET_STRUCTURE_INFO, getStructure);
}
