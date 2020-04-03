import {
  SET_SOCKET,
  SET_ADMIN,
  SET_USER,
  SET_ANSWERS,
  USER_LOGOUT,
} from './types';

export function setSocket(payload) {
  return ({ type: SET_SOCKET, payload });
}

export function setAdmin(payload) {
  return ({ type: SET_ADMIN, payload });
}

export function setUser(payload) {
  return ({ type: SET_USER, payload });
}

export function logout(payload) {
  return ({ type: USER_LOGOUT, payload });
}