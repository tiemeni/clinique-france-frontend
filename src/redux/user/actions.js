
import {
  DELETE_USER_REQUEST,
  FILTERING_ON_USERS,
  GET_ALL_USERS,
  LOGIN_REQUEST,
  POST_USER_REQUEST,
  SEARCH_USER_REQUEST,
  UNFILTERED_ON_USERS,
  UPDATE_USER_REQUEST,
} from './types';

export const processLogin = (payload) => ({
  type: LOGIN_REQUEST,
  payload,
});

export const getAllUser = (payload) => ({
  type: GET_ALL_USERS,
  payload,
});

export const postUser = (user) => ({
  type: POST_USER_REQUEST,
  user,
});

export const updateUser = (user) => ({
  type: UPDATE_USER_REQUEST,
  user,
});

export const deleteUser = (id) => ({
  type: DELETE_USER_REQUEST,
  id,
});

export const filterOnUsers = (payload) => ({
  type: FILTERING_ON_USERS,
  payload,
});

export const unFilterOnUsers = () => ({
  type: UNFILTERED_ON_USERS,
});

export const searchUser=(wordKey) => ({
  type: SEARCH_USER_REQUEST,
  wordKey
})
