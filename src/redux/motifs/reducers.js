import * as types from './types';

/**
 * @description remarquer qu'on defini des valeurs initial aux deux parametres
 * aussi
 */

const initialState = {
  motifs: [],
  motifsBySpec: []
};

const MotifReducers = (state = initialState, action = undefined) => {
  switch (action.type) {
    case types.GET_ALL_MOTIFS:
      return {
        ...state,
        loadingMotifs: true,
      };
    case types.GET_ALL_MOTIFS_SUCCESS:
      return {
        ...state,
        motifs: action.payload,
        loadingMotifs: false,
      };
    case types.GET_ALL_MOTIFS_FAILED:
      return {
        ...state,
        loadingMotifs: false,
      };
    case types.POST_MOTIF_REQUEST:
      return {
        ...state,
        postingMotif: true,
      };
    case types.POST_MOTIF_REQUEST_SUCCESS:
      return {
        ...state,
        postingMotif: false,
      };
    case types.POST_MOTIF_REQUEST_FAILED:
      return {
        ...state,
        postingMotif: false,
        errorPostingMotif: action.payload,
      };
    case types.UPDATING_MOTIF_REQUEST:
      return {
        ...state,
        updatingMotif: true,
      };
    case types.UPDATING_MOTIF_REQUEST_SUCCESS:
      return {
        ...state,
        updatingMotif: false,
      };
    case types.UPDATING_MOTIF_REQUEST_FAILED:
      return {
        ...state,
        updatingMotif: false,
        errorupdatingMotif: action.payload,
      };
    case types.DELETE_MOTIF_REQUEST:
      return {
        ...state,
        deletingMotif: true,
      };
    case types.DELETE_MOTIF_REQUEST_SUCCESS:
      return {
        ...state,
        deletingMotif: false,
      };
    case types.DELETE_MOTIF_REQUEST_FAILED:
      return {
        ...state,
        deletingMotif: false,
        errordeletingMotif: action.payload,
      };
      case types.GET_MOTIFS_BY_SPECS_SUCCESS:
        return {
          ...state,
          motifsBySpec: action.payload
        }
      
    case types.SEARCH_MOTIF_REQUEST:
      return {
        ...state,
        loadingMotifs: true,
      };
    case types.SEARCH_MOTIF_SUCCESS:
      return{
        ...state,
        motifs: action.payload,
        loadingMotifs: false,
      };  
    case types.SEARCH_MOTIF_FAILLED:
      return {
        ...state,
        loadingMotifs: false,
      };  
    default:
      return state;
  }
};

export default MotifReducers;
