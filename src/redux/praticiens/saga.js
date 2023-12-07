import { put, takeLatest } from 'redux-saga/effects';
import * as types from './types';
import {
  deleteUnauthRequest,
  getUnauthRequest,
  patchUnauthRequest,
  postUnauthRequest,
} from '../../utils/api';
import { convertIndexIntoNumber, formatUserName } from '../../utils/helpers';
import { SHOW_MODAL_DEL_RESSOURCE } from '../common/types';

const { REACT_APP_BASE_URL } = process.env;

const idc = localStorage.getItem('idc');

/**
 * @description ici le saga reducer de l'evenement RESET_APP
 */

function* getPraticiens() {
  try {
    const res = yield getUnauthRequest(
      `${REACT_APP_BASE_URL}/users/profession/?isPraticien=true`,
    );
    if (!res.success) {
      yield put({
        type: types.GET_PRATICIENS_FAILED,
        payload: {
          error: "Quelque chose s'est mal passé./nVeuillez réessayer plus tard",
        },
      });
    }

    const storedList = localStorage.getItem(`practitionerCheckedList${idc}`);
    let selectedPractitioner = '';
    let selectedValues = {};
    
    // if checked practitioner was saved
    if (storedList) {
      const namesList = localStorage
        .getItem(`practitionerCheckedListNames${idc}`)
        .split(';');
      selectedPractitioner = storedList.split(';');
      selectedValues = {
        idsList: selectedPractitioner,
        namesList,
      };
    } else {
      const profession = Object.keys(res.data)[0];
      [selectedPractitioner] = res.data[profession];
      selectedValues = {
        idsList: [selectedPractitioner._id],
        namesList: [
          formatUserName(
            selectedPractitioner.name,
            selectedPractitioner.surname,
          ),
        ],
      };
    }
    localStorage.setItem(
      `practitionerCheckedList${idc}`,
      selectedValues.idsList.join(';'),
    );
    localStorage.setItem(
      `practitionerCheckedListNames${idc}`,
      selectedValues.namesList.join(';'),
    );

    yield put({
      type: types.GET_PRATICIENS_SUCCESS,
      payload: { res, selectedValues },
    });
  } catch (error) {
    console.error('error', error);
    yield put({
      type: types.GET_PRATICIENS_FAILED,
      payload: { error: error?.message },
    });
  }
}

function* getAllPraticiens() {
  try {
    const res = yield getUnauthRequest(
      `${REACT_APP_BASE_URL}/users/?isPraticien=true`,
    );
    if (!res.success)
      yield put({
        type: types.GET_ALL_PRATICIENS_FAILED,
        payload: {
          error: "Quelque chose s'est mal passé./nVeuillez réessayer plus tard",
        },
      });
    yield put({ type: types.GET_ALL_PRATICIENS_SUCCESS, payload: res });
  } catch (error) {
    yield put({
      type: types.GET_ALL_PRATICIENS_FAILED,
      payload: { error: error?.message },
    });
  }
}

function* postPraticien({ praticien }) {
  const payload = {
    civility: praticien?.civility,
    name: praticien.name,
    surname: praticien.surname,
    birthdate: praticien.birthdate,
    telephone: praticien.telephone,
    email: praticien.email,
    password: praticien?.password,
    initiales: praticien.initiales,
    job: praticien?.job,
    timeSlot: convertIndexIntoNumber(praticien?.timeSlot),
    active: praticien.active ? 1 : 2,
    affectation: [praticien?.affectation],
    isPraticien: true,
  };
  try {
    const result = yield postUnauthRequest(
      `${process.env.REACT_APP_BASE_URL}/users/register/`,
      payload,
    );
    if (result.success) {
      yield put({
        type: types.POST_PRATICIEN_REQUEST_SUCCESS,
      });
      yield put({ type: types.GET_ALL_PRATICIENS_REQUEST });
      window.history.back();
    } else {
      yield put({
        type: types.POST_PRATICIEN_REQUEST_FAILED,
        payload: result.message,
      });
    }
  } catch (error) {
    yield put({
      type: types.POST_PRATICIEN_REQUEST_FAILED,
      payload: error.message,
    });
  }
}

function* updatePraticien({ praticien }) {
  const payload = {
    civility: praticien?.civility,
    name: praticien.name,
    surname: praticien.surname,
    birthdate: praticien.birthdate,
    telephone: praticien.telephone,
    email: praticien.email,
    password: praticien?.password,
    initiales: praticien.initiales,
    job: praticien?.job,
    timeSlot: convertIndexIntoNumber(praticien?.timeSlot),
    active: parseInt(praticien.active, 10) === 1,
    groups: [praticien?.groups],
    affectation: [praticien?.affectation],
    isPraticien: true,
  };
  try {
    const result = yield patchUnauthRequest(
      `${process.env.REACT_APP_BASE_URL}/users/${praticien?._id}/?isPraticien=true`,
      payload,
    );
    if (result.success) {
      yield put({
        type: types.UPDATE_PRATICIEN_REQUEST_SUCCESS,
      });
      yield put({ type: types.GET_ALL_PRATICIENS_REQUEST });
      window.history.back();
    } else {
      yield put({
        type: types.UPDATE_PRATICIEN_REQUEST_FAILED,
        payload: result.message,
      });
    }
  } catch (error) {
    yield put({
      type: types.UPDATE_PRATICIEN_REQUEST_FAILED,
      payload: error.message,
    });
  }
}

function* deletePraticien({ id }) {
  try {
    const result = yield deleteUnauthRequest(
      `${process.env.REACT_APP_BASE_URL}/users/${id}?isPraticien=true`,
    );
    if (result.success) {
      yield put({
        type: types.DELETE_PRATICIEN_REQUEST_SUCCESS,
      });
      yield put({ type: SHOW_MODAL_DEL_RESSOURCE, truth: false });
      yield put({ type: types.GET_ALL_PRATICIENS_REQUEST });
    } else {
      yield put({
        type: types.DELETE_PRATICIEN_REQUEST_FAILED,
        payload: result.message,
      });
    }
  } catch (error) {
    yield put({
      type: types.DELETE_PRATICIEN_REQUEST_FAILED,
      payload: error.message,
    });
  }
}

export default function* PraticiensSaga() {
  yield takeLatest(types.GET_PRATICIENS_REQUEST, getPraticiens);
  yield takeLatest(types.GET_ALL_PRATICIENS_REQUEST, getAllPraticiens);
  yield takeLatest(types.POST_PRATICIEN_REQUEST, postPraticien);
  yield takeLatest(types.UPDATE_PRATICIEN_REQUEST, updatePraticien);
  yield takeLatest(types.DELETE_PRATICIEN_REQUEST, deletePraticien);
}
