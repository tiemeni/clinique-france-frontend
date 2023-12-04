import * as types from './types';

/**
 * @description remarquer qu'on defini des valeurs initial aux deux parametres
 * aussi
 */

const initialState = {
  civilities: [],
};

const CivilityReducers = (state = initialState, action = undefined) => {
  switch (action.type) {
    case types.GET_ALL_CIVILITIES:
      return {
        ...state,
      };
    case types.GET_ALL_CIVILITIES_SUCCESS:
      return {
        ...state,
        civilities: action.payload,
      };
    default:
      return state;
  }
};

export default CivilityReducers;
