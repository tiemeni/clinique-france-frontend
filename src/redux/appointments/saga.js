import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from './types';
import { AGENDA_DATE_CLICK } from '../common/types';
import { ajouterDuree, delay, incrementTime } from '../../utils/helpers';
import {
  deleteUnauthRequest,
  putUnauthRequest,
  postUnauthRequest,
  getUnauthRequest,
} from '../../utils/api';

const BASE_URL = process.env.REACT_APP_BASE_URL;

function extractQuery(payload) {
  let query = {};
  if (payload.isMenu) {
    query.status = payload.status;
  } else {
    query = {
      startTime: payload.heureDebut,
      endTime: incrementTime(payload.heureDebut, payload.duration),
      date: payload.date,
      date_long: payload.date_long,
      duration: payload.duration,
      status: payload?.status,
      motif: payload?.motif
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
    yield put({
      type: types.CLEAR_ALL_ERR_MSG_PR,
    });
    if (!result.success) {
      yield put({
        type: types.UPDATE_APPOINTMENT_FAILED,
        error: "Une erreur est survenue lors de l'exécution de la requête",
      });
      yield call(delay, 4000);
      yield put({
        type: types.CLEAR_ALL_ERR_MSG_PR,
      });
      return;
    }

    yield put({ type: types.UPDATE_APPOINTMENT_SUCCESS });
    yield put({
      type: AGENDA_DATE_CLICK,
      payload: { date: '', isOpen: false },
    });
  } catch (error) {
    yield put({ type: types.UPDATE_APPOINTMENT_FAILED, error: `${error.message} - veillez verifier votre connexion internet` });
    yield call(delay, 4000);
    yield put({
      type: types.CLEAR_ALL_ERR_MSG_PR,
    });
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
    yield put({
      type: AGENDA_DATE_CLICK,
      payload: { date: '', isOpen: false },
    });
  } catch (error) {
    yield put({ type: types.DELETE_APPOINTMENT_FAILED });
  }
}

function* pasteAppointment({ payload }) {
  try {
    const url = `${BASE_URL}/appointments/duplicate/`;
    const result = yield postUnauthRequest(url, payload);
    yield put({
      type: types.CLEAR_ALL_ERR_MSG_PR,
    });
    if (!result.success) {
      yield put({
        type: types.DUPLICATE_APPOINTMENT_FAILED,
        error: "Erreur lors de l'execution",
      });
      yield call(delay, 4000);
      yield put({
        type: types.CLEAR_ALL_ERR_MSG_PR,
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
      type: types.DUPLICATE_APPOINTMENT_FAILED,
      error: 'Une erreur est survenue lors du traitement de votre demande.',
    });
    yield call(delay, 4000);
    yield put({
      type: types.CLEAR_ALL_ERR_MSG_PR,
    });
  }
}

function* reportAppointment({ payload }) {
  const query = new URLSearchParams({ ...payload });
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

function* postRDV({ data }) {
  const url1 = `${BASE_URL}/patients/register`
  const url2 =
    `${BASE_URL}/appointments/enregistrer_rdv/`;
  const payload = {
    name: data?.name,
    surname: data?.surname ?? "",
    birthdate: data?.birthdate,
    telephone: data?.phone,
    email: data?.email,
    active: true,
  };
  try {
    const result = yield postUnauthRequest(url1, payload);
    // const idFiche;
    let rdv;
    yield put({
      type: types.CLEAR_ALL_ERR_MSG_PR,
    });
    if (result.message) {
      const rdvData = {
        practitioner: data?.praticien,
        patient: result.message,
        motif: data?.motif,
        startTime: data?.heureDebut,
        endTime: ajouterDuree(data?.heureDebut, data?.duree),
        provenance: "backoffice",
        duration: data?.duree,
        date_long: data?.date_long ? data?.date_long : new Date().toISOString(),
        // "dayOfWeek": 1,
        date: data?.date,
      };
      // idFiche = result.message;
      rdv = yield postUnauthRequest(url2, rdvData);
      // yield put({ type: types.GET_DISPO_REQUEST_SUCCESS, payload: result.data })
      // RootNavigation.navigate(SCREENS.HOME_CONTAINER_ROUTE)
    } else if (result.data._id) {
      const rdvData = {
        practitioner: data?.praticien,
        patient: result.data._id,
        motif: data?.motif,
        startTime: data?.heureDebut,
        // data?.period?.time,
        endTime: ajouterDuree(data?.heureDebut, data?.duree),
        provenance: "backoffice",
        duration: data?.duree,
        date_long: data?.date_long ? data?.date_long : new Date().toISOString(),
        // "dayOfWeek": 1,
        date: data?.date,
      };
      // idFiche = result.data?._id;
      rdv = yield postUnauthRequest(url2, rdvData);
    } else {
      yield put({
        type: types.CREATE_RDV_REQUEST_FAILED,
        payload: `Erreur lors de la creation du rendez-vous! - ${result?.message ?? ""}`,
      });
      yield call(delay, 4000);
      yield put({
        type: types.CLEAR_ALL_ERR_MSG_PR,
      });
      yield put({ type: "CLEAR_ERR_SUCC" });
    }
    if (rdv?.success) {
      yield put({
        type: types.CREATE_RDV_REQUEST_SUCCESS,
        payload: rdv?.data[0],
      });
      yield put({
        type: AGENDA_DATE_CLICK,
        payload: { date: '', isOpen: false },
      });
    } else {
      yield put({
        type: types.CREATE_RDV_REQUEST_FAILED,
        payload: `Erreur lors de la creation du rendez-vous! - ${result?.message ?? ""}`,
      });
      yield call(delay, 4000);
      yield put({
        type: types.CLEAR_ALL_ERR_MSG_PR,
      });
      yield put({ type: "CLEAR_ERR_SUCC" });
    }
  } catch (error) {
    yield put({ type: types.CREATE_RDV_REQUEST_FAILED, payload: `${error.message} - veillez verifier votre connexion internet` });
    yield call(delay, 4000);
    yield put({ type: "CLEAR_ERR_SUCC" });
    yield put({
      type: types.CLEAR_ALL_ERR_MSG_PR,
    });
  }
}

export default function* AppointmentsSaga() {
  yield takeLatest(types.UPDATE_APPOINTMENT_REQUEST, updateAppointment);
  yield takeLatest(types.DELETE_APPOINTMENT_REQUEST, deleteAppointment);
  yield takeLatest(types.DUPLICATE_APPOINTMENT_REQUEST, pasteAppointment);
  yield takeLatest(types.GET_DISPO_REQUEST, reportAppointment);
  yield takeLatest(types.CREATE_RDV_REQUEST, postRDV);
}
