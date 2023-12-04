import { put, takeLatest } from 'redux-saga/effects';
import * as types from './types';
import { getUnauthRequest } from '../../utils/api';

/**
 * @description ici le saga reducer de l'evenement RESET_APP
 */

function* getAllCivilities() {
  try {
    const result = yield getUnauthRequest(
      `${process.env.REACT_APP_BASE_URL}/civilites/`,
    );
    if (result.success) {
      yield put({
        type: types.GET_ALL_CIVILITIES_SUCCESS,
        payload: result.data,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
}

export default function* CivilitySaga() {
  yield takeLatest(types.GET_ALL_CIVILITIES, getAllCivilities);
}
