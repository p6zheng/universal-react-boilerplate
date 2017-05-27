import * as actionTypes from '../constants/actionTypes';

const message = (state={}, action) => {
  switch (action.type) {
    case actionTypes.DISPLAY_MESSAGE:
      return action.message;
    default:
      return state;
  }
};

export default message;

export const getMessage = state => state;