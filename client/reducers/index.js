import { combineReducers } from 'redux';
import message, * as messageReducer from './MessageReducer';
import agents, * as agentReducer from './AgentReducer';

const rootReducer = combineReducers({
  message,
  agents
});

export default rootReducer;

/* Selectors */

// Secret Message Reducer
export const getMessage = state => messageReducer.getMessage(state.message);
export const getAgents = state => agentReducer.getAgents(state.agents);
