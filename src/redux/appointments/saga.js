import { put, takeLatest } from 'redux-saga/effects';
import * as types from './types';
import { AGENDA_DATE_CLICK } from '../common/types';
import { incrementTime } from '../../utils/helpers';
import {
  deleteUnauthRequest,
  putUnauthRequest,
  postUnauthRequest,
  getUnauthRequest,
} from '../../utils/api';

const idc = localStorage.getItem('idc');
const BASE_URL = process.env.REACT_APP_LOCAL_URL;

function extractQuery(payload) {
  let query = {};
  if (payload.isMenu) {
    query.status = payload.status;
  } else {
    query = {
      startTime: payload.heureDebut,
      endTime: incrementTime(payload.heureDebut, payload.duration),
      date: payload.date,
      // centre: payload.idCentre ?? idc,
      date_long: payload.date_long,
      duration: payload.duration,
      status: payload?.status,
    };
  }
  if (payload.wasMoved) query.wasMoved = payload.wasMoved;

  return query;
}

/**
 * update informations about the current appointment.
 * @param {*} idCentre, date_long, date, startTime, endTIme
 */
function* updateAppointment({ payload }) {
  try {
    const query = extractQuery(payload);
    const url = `${BASE_URL}/appointments/update/${payload._id}/`;
    const result = yield putUnauthRequest(url, query);

    if (!result.success) {
      yield put({
        type: types.UPDATE_APPOINTMENT_FAILED,
        error: "Une erreur est survenue lors de l'exécution de la requête",
      });
      return;
    }

    yield put({ type: types.UPDATE_APPOINTMENT_SUCCESS });
  } catch (error) {
    yield put({ type: types.UPDATE_APPOINTMENT_FAILED, error });
  }
}

function* deleteAppointment({ payload }) {
  try {
    const result = yield deleteUnauthRequest(
      `${BASE_URL}/appointments/${payload}/`,
    );

    if (!result.success) {
      yield put({ type: types.DELETE_APPOINTMENT_FAILED });
      return;
    }
    yield put({ type: types.DELETE_APPOINTMENT_SUCCESS });
  } catch (error) {
    yield put({ type: types.DELETE_APPOINTMENT_FAILED });
  }
}

function* pasteAppointment({ payload }) {
  try {
    const url = `${BASE_URL}/appointments/duplicate/`;
    const result = yield postUnauthRequest(url, payload);

    if (!result.success) {
      yield put({
        type: types.DUPLICATE_APPOINTMENT_FAILED,
        error: "Erreur lors de l'execution",
      });
      return;
    }
    yield put({ type: types.DUPLICATE_APPOINTMENT_SUCCESS });
    yield put({
      type: types.COPY_APPOINTMENT_ID,
      payload: { id: null, duration: null },
    });
    yield put({
      type: AGENDA_DATE_CLICK,
      payload: { date: '', isOpen: false },
    });
  } catch (error) {
    yield put({
      type: types.DUPLICATE_APPOINTMENT_REQUEST,
      error: 'Une erreur est survenue lors du traitement de votre demande.',
    });
  }
}

function* reportAppointment({ payload }) {
  const query = new URLSearchParams({ ...payload, idCentre: idc });
  try {
    const url = `${BASE_URL}/appointments/rechercher_dispo?${query.toString()}`;
    const result = yield getUnauthRequest(url);

    if (!result.success) {
      yield put({ type: types.GET_DISPO_SUCCESS, payload: [] });
      return;
    }
    yield put({ type: types.GET_DISPO_SUCCESS, payload: result.data });
  } catch (error) {
    yield put({
      type: types.GET_DISPO_FAILED,
      payload: { message: error.message },
    });
  }
}

export default function* AppointmentsSaga() {
  yield takeLatest(types.UPDATE_APPOINTMENT_REQUEST, updateAppointment);
  yield takeLatest(types.DELETE_APPOINTMENT_REQUEST, deleteAppointment);
  yield takeLatest(types.DUPLICATE_APPOINTMENT_REQUEST, pasteAppointment);
  yield takeLatest(types.GET_DISPO_REQUEST, reportAppointment);
}
