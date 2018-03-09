import { combineReducers } from 'redux';
import agents, * as agentReducer from './AgentReducer';

const rootReducer = combineReducers({
  agents
});

export default rootReducer;

/* Selectors */

// Secret Message Reducer
export const getAgents = state => agentReducer.getAgents(state.agents);
