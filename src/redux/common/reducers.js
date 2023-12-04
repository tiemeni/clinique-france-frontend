import * as types from './types';

/**
 * @description remarquer qu'on defini des valeurs initial aux deux parametres
 * aussi
 */

const initialState = {
  dateSelected: null,
  openModal: false,
  showLoader: false,
  showFicheRdv: false,
  infoRdv: {},
  openDeletion: false,
  eventId: '',
  mode: 'delete',
  structure: {},
};

const CommonReducer = (state = initialState, action = undefined) => {
  switch (action.type) {
    case types.SHOW_MODAL_DEL_RESSOURCE:
      return {
        ...state,
        showModRessource: action.truth,
      };
    case types.RESET_APP:
      return {
        ...state,
        waveForLogin: 'App reset good , welcome login',
      };
    case types.AGENDA_DATE_CLICK:
      return {
        ...state,
        dateSelected: action.payload.date,
        openModal: action.payload.isOpen,
      };
    case types.SHOW_CALENDAR_LOADER:
      return {
        ...state,
        showLoader: action.payload,
      };
    case types.EVENT_CLICK:
      return {
        ...state,
        showFicheRdv: action.payload.showFicheRdv,
        infoRdv: { ...action.payload.infoRdv },
      };
    case types.DELETE_EVENT:
      return {
        ...state,
        openDeletion: action.payload.open,
        eventId: action.payload.idRdv,
        mode: action.payload.mode,
        dateSelected: action.payload?.dateStr,
      };
    case types.GET_STRUCTURE_INFO:
      return {
        ...state,
      };
    case types.GET_STRUCTURE_INFO_SUCCESS:
      return {
        ...state,
        structure: action.payload,
      };
    case types.GET_STRUCTURE_INFO_FAILED:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default CommonReducer;
