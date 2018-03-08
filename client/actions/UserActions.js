import * as actionTypes from '../constants/actionTypes';
import api from '../utils/apiCaller';

export const fetchAgents = () => (dispatch) => {

  dispatch({type: actionTypes.FETCH_AGENTS_REQUEST});
  
  api('users').then(
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
