import * as actionTypes from '../constants/actionTypes';
import api from '../utils/apiCaller';

export const fetchAgents = () => (dispatch) => {

  dispatch({type: actionTypes.FETCH_AGENTS_REQUEST});
  
  return api('users/status').then(
    res => {
      dispatch({
        type: actionTypes.FETCH_AGENTS_SUCCESS,
        agents: res.data.agents
      });
    },
    error => {
      dispatch({
        type: actionTypes.FETCH_AGENTS_ERROR,
        error: error.response.data.error
      });
    });

};

export const fetchEvents = (id, type) => (dispatch) => {

  dispatch({type: actionTypes.FETCH_EVENTS_REQUEST});

  api(`users/${id}/types/${type}`).then(
    res => {
      dispatch({
        type: actionTypes.FETCH_EVENTS_SUCCESS,
        events: res.data.events
      });
    },
    error => {
      dispatch({
        type: actionTypes.FETCH_EVENTS_ERROR,
        error: error.response.data.error
      });
    });

};
