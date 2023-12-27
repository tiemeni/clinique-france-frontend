import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from './types';
import {
  deleteUnauthRequest,
  getUnauthRequest,
  patchUnauthRequest,
  postUnauthRequest,
} from '../../utils/api';
import { SHOW_MODAL_DEL_RESSOURCE } from '../common/types';
import { delay } from '../../utils/helpers';

const { REACT_APP_BASE_URL } = process.env;
// const BASE_URL = process.env.REACT_APP_BASE_URL;

/**
 * @description ici le saga reducer de l'evenement RESET_APP
 */

function* login({ payload }) {
  const data = {
    email: payload.email,
    password: payload.password,
  };
  try {
    const result = yield postUnauthRequest(
      `${REACT_APP_BASE_URL}/users/signin`,
      data,
    );
    if (result.success) {

      yield put({
        type: types.LOGIN_REQUEST_SUCCESS,
        payload: result.data?.user,
      });

      localStorage.setItem('acces_bo_token', result.data.access_token);
      localStorage.setItem('idc', payload?.idCentre);
      localStorage.setItem('username', result.data.user.name);

      window.location = '/content';
    } else {
      yield put({ type: types.LOGIN_REQUEST_FAILED, payload: result.message });
    }
  } catch (error) {
    console.log(typeof (error.message), error.message)
    yield put({ type: types.LOGIN_REQUEST_FAILED, payload: error.message });
  }
}

function* getAllUsers() {
  try {
    const result = yield getUnauthRequest(
      `${REACT_APP_BASE_URL}/users/`,
    );
    if (result.success) {
      yield put({ type: types.GET_ALL_USERS_SUCCESS, payload: result.data });
    } else {
      yield put({ type: types.GET_ALL_USERS_FAILED, payload: result.message });
    }
  } catch (error) {
    yield put({ type: types.GET_ALL_USERS_FAILED, payload: error.message });
  }
}

function* postUser({ user }) {
  const payload = {
    civility: user?.civility,
    name: user.name,
    surname: user.surname,
    birthdate: user.birthdate,
    telephone: user.telephone,
    email: user.email,
    password: user?.password,
    initiales: user.initiales,
    active: user.active ? 1 : 2,
    groups: user?.groups,
  };
  try {
    const result = yield postUnauthRequest(
      `${process.env.REACT_APP_BASE_URL}/users/register`,
      payload,
    );
    yield put({
      type: types.RESET_ALL_FIELD,
    });
    if (result.success) {
      yield put({
        type: types.POST_USER_REQUEST_SUCCESS,
      });
      yield put({ type: types.GET_ALL_USERS });
      window.history.back();
    } else {
      yield put({
        type: types.POST_USER_REQUEST_FAILED,
        payload: result.message,
      });
      yield call(delay, 4000);
      yield put({
        type: types.RESET_ALL_FIELD,
      });
    }
  } catch (error) {
    yield put({
      type: types.POST_USER_REQUEST_FAILED,
      payload: `${error.message} - veillez verifier votre connexion internet`,
    });
    yield call(delay, 4000);
    yield put({
      type: types.RESET_ALL_FIELD,
    });
  }
}

function* updateUser({ user }) {
  const payload = {
    civility: user?.civility,
    name: user.name,
    surname: user.surname,
    birthdate: user.birthdate,
    telephone: user.telephone,
    email: user.email,
    password: user?.password,
    initiales: user.initiales,
    active: user.active === '1',
    groups: user?.groups,
  };
  try {
    const result = yield patchUnauthRequest(
      `${process.env.REACT_APP_BASE_URL}/users/${user?._id}/`,
      payload,
    );
    yield put({
      type: types.RESET_ALL_FIELD,
    });
    if (result.success) {
      yield put({
        type: types.UPDATE_USER_REQUEST_SUCCESS,
      });
      yield put({ type: types.GET_ALL_USERS });
      window.history.back();
    } else {
      yield put({
        type: types.UPDATE_USER_REQUEST_FAILED,
        payload: result.message,
      });
      yield call(delay, 4000);
      yield put({
        type: types.RESET_ALL_FIELD,
      });
    }
  } catch (error) {
    yield put({
      type: types.UPDATE_USER_REQUEST_FAILED,
      payload: `${error.message} - veillez verifier votre connexion internet`,
    });
    yield call(delay, 4000);
    yield put({
      type: types.RESET_ALL_FIELD,
    });
  }
}

function* deleteUser({ id }) {
  try {
    const result = yield deleteUnauthRequest(
      `${process.env.REACT_APP_BASE_URL}/users/${id}`,
    );
    yield put({
      type: types.RESET_ALL_FIELD,
    });
    if (result.success) {
      yield put({
        type: types.DELETE_USER_REQUEST_SUCCESS,
      });
      yield put({ type: SHOW_MODAL_DEL_RESSOURCE, truth: false });
      yield put({ type: types.GET_ALL_USERS });
    } else {
      yield put({ type: SHOW_MODAL_DEL_RESSOURCE, truth: false });
      yield put({
        type: types.DELETE_USER_REQUEST_FAILED,
        payload: result.message,
      });
      yield call(delay, 4000);
      yield put({
        type: types.RESET_ALL_FIELD,
      });
    }
  } catch (error) {
    yield put({ type: SHOW_MODAL_DEL_RESSOURCE, truth: false });
    yield put({
      type: types.DELETE_USER_REQUEST_FAILED,
      payload: `${error.message} - veillez verifier votre connexion internet`,
    });
    yield call(delay, 4000);
    yield put({
      type: types.RESET_ALL_FIELD,
    });
  }
}

function* searchUser({ wordKey }) {
  const url1 = `${REACT_APP_BASE_URL}/users/search?email=${wordKey?.email}&surname=${wordKey.nom}`;
  try {
    const result = yield getUnauthRequest(url1);

    if (result.success) {
      yield put({ type: types.SEARCH_USER_SUCCESS, payload: result.data });
    } else {
      yield put({ type: types.SEARCH_USER_FAILLED, payload: result.message });
    }
  } catch (error) {
    yield put({ type: types.SEARCH_USER_FAILLED, payload: error.message });
  }
}

export default function* UserSaga() {
  yield takeLatest(types.LOGIN_REQUEST, login);
  yield takeLatest(types.GET_ALL_USERS, getAllUsers);
  yield takeLatest(types.POST_USER_REQUEST, postUser);
  yield takeLatest(types.UPDATE_USER_REQUEST, updateUser);
  yield takeLatest(types.DELETE_USER_REQUEST, deleteUser);
  yield takeLatest(types.SEARCH_USER_REQUEST, searchUser);
}
