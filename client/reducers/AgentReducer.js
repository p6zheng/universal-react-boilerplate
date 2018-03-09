import * as actionTypes from '../constants/actionTypes';

const initialState = {};

const agents = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_AGENTS_SUCCESS:
      return action.agents;
    default:
      return state;
  }
};

export default agents;

export const getAgents = state => state;