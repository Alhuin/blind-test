import {
  SET_SOCKET,
  SET_ADMIN,
  SET_USER,
  SET_ANSWERS,
} from '../actions/types';

const initialState = {
  socket: null,
  admin: false,
  userName: '',
  addedMusics: [],
  answers: [],
  musics: [],
};

const blindReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SOCKET:
      return {
        ...state, socket: action.payload,
      };
    case SET_ADMIN:
      return {
        ...state, admin: action.payload,
      };
    case SET_USER:
      console.log(action.payload);
      return {
        ...state, userName: action.payload.userName, addedMusics: action.payload.addedMusics,
      };
    case SET_ANSWERS:
      return {
        ...state, answers: action.payload,
      };
    default:
      return state;
  }
};

export default blindReducer;