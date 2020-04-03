import { combineReducers } from 'redux';
import blindReducer from './blindReducer';

const reducers = combineReducers({
  blindReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined
  }

  return reducers(state, action)
};

export default rootReducer;
