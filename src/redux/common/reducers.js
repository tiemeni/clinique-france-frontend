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
  showPratDrawer: true,
  tokenValid: false,
  isVerifyingToken:false,
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
        mode: action.payload.mode
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
      case types.TOGGLE_PRATICIEN_PANEL:
        return {
          ...state,
          showPratDrawer: action.truth
        }
        case types.VERIFY_TOKEN:
          return {
            ...state,
            isVerifyingToken: true
          }
        case types.ISTOKENVALID: 
        return {
          ...state,
          isVerifyingToken: false,
          tokenValid: action.truth
        }
        case types.ISTOKENVALID_FAILED: 
        return {
          ...state,
          isVerifyingToken: false,
          tokenValid: action.truth
        }
    default:
      return state;
  }
};

export default CommonReducer;
