import * as types from './types';

/**
 * @description remarquer qu'on defini des valeurs initial aux deux parametres
 * aussi
 */

const initialState = {
  lieux: [],
};

const LieuxReducers = (state = initialState, action = undefined) => {
  switch (action.type) {
    case types.GET_ALL_LIEUX:
      return {
        ...state,
        gettingAllLieux: true,
      };
    case types.GET_ALL_LIEUX_SUCCESS:
      return {
        ...state,
        lieux: action.payload,
        gettingAllLieux: false,
      };
    case types.POST_LIEU_REQUEST:
      return {
        ...state,
        postingLieuLoading: true,
      };
    case types.POST_LIEU_REQUEST_SUCCESS:
      return {
        ...state,
        postingLieuLoading: false,
        isErrorPostingLieu: false,
      };
    case types.POST_LIEU_REQUEST_FAILED:
      return {
        ...state,
        postingLieuLoading: false,
        errorPostingLieu: action.payload,
        isErrorPostingLieu: true,
      };
    case types.UPDATE_LIEU_REQUEST:
      return {
        ...state,
        updatingLieuLoading: true,
      };
    case types.UPDATE_LIEU_REQUEST_SUCCESS:
      return {
        ...state,
        updatingLieuLoading: false,
        isErrorupdatingLieu: false,
      };
    case types.UPDATE_LIEU_REQUEST_FAILED:
      return {
        ...state,
        updatingLieuLoading: false,
        errorupdatingLieu: action.payload,
        isErrorupdatingLieu: true,
      };

    case types.DELETE_LIEU_REQUEST:
      return {
        ...state,
        deletingLieuLoading: true,
      };
    case types.DELETE_LIEU_REQUEST_SUCCESS:
      return {
        ...state,
        deletingLieuLoading: false,
        isErrordeletingLieu: false,
      };
    case types.DELETE_LIEU_REQUEST_FAILED:
      return {
        ...state,
        deletingLieuLoading: false,
        errordeletingLieu: action.payload,
        isErrordeletingLieu: true,
      };
    default:
      return state;
  }
};

export default LieuxReducers;
