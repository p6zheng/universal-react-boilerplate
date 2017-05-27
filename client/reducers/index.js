import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import message, * as messageReducer from './MessageReducer';

const rootReducer = combineReducers({
  message,
  form
});

export default rootReducer;

/* Selectors */

// Secret Message Reducer
export const getMessage = state => messageReducer.getMessage(state.message);
