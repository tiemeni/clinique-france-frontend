import * as types from './types';

const iniatialState = {
  isLoading: false,
  isFailed: false,
  success: false,
  copyId: null,
  deleting: false,
  isDeleted: false,
  duration: null,
  pasteProcessing: false,
  pasteSuccess: false,
  pasteFailed: false,
  openReport: false,
  reportId: null,
  praticien: null,
  searching: false,
  searchError: false,
  availabilities: [],
  pname: null,
};

const AppointmentReducer = (state = iniatialState, action) => {
  switch (action.type) {
    case types.CLEAR_ALL_ERR_MSG_PR:
      return {
        ...state,
        errorCreatingRDV: null,
        updateRDVError: null,
        duplicatingRDVError:null,
        success:false,
        isFailed: false
      }
    case types.UPDATE_APPOINTMENT_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: false,
        isFailed: false,
      };
    case types.UPDATE_APPOINTMENT_FAILED:
      return {
        ...state,
        isLoading: false,
        isFailed: true,
        success: false,
        updateRDVError: action.error
      };
    case types.UPDATE_APPOINTMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isFailed: false,
        success: true,
      };
    case types.DELETE_APPOINTMENT_REQUEST:
      return {
        ...state,
        deleting: true,
        isDeleted: false,
        isFailed: false,
      };
    case types.DELETE_APPOINTMENT_FAILED:
      return {
        ...state,
        deleting: false,
        isDeleted: false,
        isFailed: true,
      };
    case types.DELETE_APPOINTMENT_SUCCESS:
      return {
        ...state,
        deleting: false,
        isDeleted: true,
        isFailed: false,
      };
    case types.COPY_APPOINTMENT_ID:
      return {
        ...state,
        copyId: action.payload.id,
        duration: action.payload.duration,
      };
    case types.DUPLICATE_APPOINTMENT_REQUEST:
      return {
        ...state,
        pasteProcessing: true,
        pasteSuccess: false,
        pasteFailed: false,
      };
    case types.DUPLICATE_APPOINTMENT_FAILED:
      return {
        ...state,
        pasteProcessing: false,
        pasteFailed: true,
        pasteSuccess: false,
        duplicatingRDVError: action.error
      };
    case types.DUPLICATE_APPOINTMENT_SUCCESS:
      return {
        ...state,
        pasteProcessing: false,
        pasteFailed: false,
        pasteSuccess: true,
      };
    case types.OPEN_REPORT_MODAL:
      return {
        ...state,
        openReport: action.payload.isOpen,
        reportId: action.payload.id,
        praticien: action.payload.idp,
        pname: action.payload.praticien,
        duration: action.payload.duration,
      };
    case types.GET_DISPO_REQUEST:
      return {
        ...state,
        searching: true,
        searchError: false,
        errorMsg: null,
        availabilities: [],
      };
    case types.GET_DISPO_SUCCESS:
      return {
        ...state,
        searching: false,
        searchError: false,
        availabilities: [...action.payload],
        errorMsg: null,
      };
    case types.GET_DISPO_FAILED:
      return {
        ...state,
        searching: false,
        searchError: true,
        errorMsg: action.payload.message,
        availabilities: [],
      };
      case types.CREATE_RDV_REQUEST:
        return {
          ...state, 
          creatingRDV: true
        }
        case types.CREATE_RDV_REQUEST_SUCCESS:
        return {
          ...state, 
          creatingRDV: false,
        }
        case types.CREATE_RDV_REQUEST_FAILED:
          console.log("error ------------> ", action.payload)
        return {
          ...state, 
          creatingRDV: false,
          errorCreatingRDV: action.payload
        }
    default:
      return state;
  }
};

export default AppointmentReducer;
