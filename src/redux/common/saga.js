import { put, takeLatest } from 'redux-saga/effects';
import * as types from './types';
import { getUnauthRequest, postUnauthRequest } from '../../utils/api';

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

function* verifyTokenSagga({onLogin}){
  try {
    const result = yield postUnauthRequest(
      `${process.env.REACT_APP_BASE_URL}/verifyToken/`,
    );
    if(!result.success){
      if(!onLogin){
        window.location = "/";
      }
      yield put({
        type: types.ISTOKENVALID,
        truth: false,
      });
    }else{
      yield put({
        type: types.ISTOKENVALID,
        truth: true,
      });
    }
  } catch (error) {
    yield put({
      type: types.ISTOKENVALID,
      truth: false,
    });
    if(!onLogin){
      window.location = "/";
    }
  }
}

function* disconnect(){
  try {
    const result = yield postUnauthRequest(
      `${process.env.REACT_APP_BASE_URL}/disconnect/`,
    );
    if(result.success){
      window.location = "/"
    }
  } catch (error) {
    console.log(error.message)
  }
}

export default function* CommonSagas() {
  yield takeLatest(types.RESET_APP, resetApp);
  yield takeLatest(types.GET_STRUCTURE_INFO, getStructure);
  yield takeLatest(types.VERIFY_TOKEN, verifyTokenSagga);
  yield takeLatest(types.DISCONNECT_USER, disconnect);
}
