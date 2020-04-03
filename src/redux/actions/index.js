import {
  SET_SOCKET,
  SET_ADMIN,
  SET_USER,
  SET_ANSWERS,
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

export function setAnswers(payload) {
  return ({ type: SET_ANSWERS, payload });
}