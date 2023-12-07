import { put, takeLatest } from 'redux-saga/effects';
import * as types from './types';
import { getUnauthRequest } from '../../utils/api';

/**
 * @description ici le saga reducer
 */

function* getAllGroupes() {
  try {
    const result = yield getUnauthRequest(
      `${process.env.REACT_APP_BASE_URL}/groupes/`,
    );
    if (result.success) {
      yield put({ type: types.GET_ALL_GROUPS_SUCCESS, payload: result.data });
    }
  } catch (error) {
    console.log(error.message);
  }
}

export default function* GroupeSaga() {
  yield takeLatest(types.GET_ALL_GROUPS, getAllGroupes);
}
