import * as types from './types';

/**
 * @description remarquer qu'on defini des valeurs initial aux deux parametres
 * aussi
 */

const initialState = {
  groups: [],
};

const GroupesReducers = (state = initialState, action = undefined) => {
  switch (action.type) {
    case types.GET_ALL_GROUPS:
      return {
        ...state,
      };
    case types.GET_ALL_GROUPS_SUCCESS:
      return {
        ...state,
        groups: action.payload,
      };
    default:
      return state;
  }
};

export default GroupesReducers;
