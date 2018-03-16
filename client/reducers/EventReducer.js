import * as actionTypes from '../constants/actionTypes';

const initialState = [];

const events = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_EVENTS_SUCCESS:
      return action.events;
    default:
      return state;
  }
};

export default events;

export const getEvents = state => state;