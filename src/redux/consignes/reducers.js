import * as types from './types';

/**
 * @description remarquer qu'on defini des valeurs initial aux deux parametres
 * aussi
 */

const initialState = {
  consignes: [],
  gettingAllConsigneError: '',
  creatingConsigneError: '',
  updatingConsigneError: '',
  deletingConsigneError: '',
  creatingConsigne: false,
  deletingConsigne: false,
  gettingAllConsigne: false,
  updatingConsigne: false,
  searchCons: false
};

const ConsigneReducers = (state = initialState, action = undefined) => {
  switch (action.type) {
    case types.CLEAR_ALL_ERR_MSG_CONS:
      return {
        ...state,
        creatingConsigneError: null,
        updatingConsigneError: null,
        deletingConsigneError: null
      }
    case types.GET_ALL_CONSIGNES:
      return {
        ...state,
        gettingAllConsigne: true
      };
    case types.GET_ALL_CONSIGNES_SUCCESS:
      return {
        ...state,
        gettingAllConsigne: false,
        consignes: action.payload,
      };
    case types.GET_ALL_CONSIGNES_FAILED:
      return {
        ...state,
        gettingAllConsigne: false,
        gettingAllConsigneError: action.payload,
      };
    case types.CREATE_CONSIGNE:
      return {
        ...state,
        creatingConsigne: true
      };
    case types.CREATE_CONSIGNE_SUCCESS:
      return {
        ...state,
        creatingConsigne: false,
      };
    case types.CREATE_CONSIGNE_FAILED:
      return {
        ...state,
        creatingConsigne: false,
        creatingConsigneError: action.payload,
      };
    case types.UPDATE_CONSIGNE:
      return {
        ...state,
        updatingConsigne: true
      };
    case types.UPDATE_CONSIGNE_SUCCESS:
      return {
        ...state,
        updatingConsigne: false,
      };
    case types.UPDATE_CONSIGNE_FAILED:
      return {
        ...state,
        updatingConsigne: false,
        updatingConsigneError: action.payload,
      };
    case types.DELETE_CONSIGNE:
      return {
        ...state,
        deletingConsigne: true
      };
    case types.DELETE_CONSIGNE_SUCCESS:
      return {
        ...state,
        deletingConsigne: false,
      };
    case types.DELETE_CONSIGNE_FAILED:
      return {
        ...state,
        deletingConsigne: false,
        deletingConsigneError: action.payload,
      };
    case types.SEARCH_CONSIGNE_REQUEST:
      return {
        ...state,
        searchCons: true
      };
    case types.SEARCH_CONSIGNE_SUCCESS:
      return {
        ...state,
        searchCons: false,
        consignes: action.payload
      };
    case types.SEARCH_CONSIGNE_FAILLED:
      return {
        ...state,
        searchCons: false
      };
    default:
      return { ...state };
  }
};

export default ConsigneReducers;
