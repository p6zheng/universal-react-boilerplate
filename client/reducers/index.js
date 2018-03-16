import { combineReducers } from 'redux';
import agents, * as agentReducer from './AgentReducer';
import events, * as eventReducer from './EventReducer';

const rootReducer = combineReducers({
  agents,
  events
});

export default rootReducer;

/* Selectors */

// Secret Message Reducer
export const getAgents = state => agentReducer.getAgents(state.agents);
export const getEvents = state => eventReducer.getEvents(state.events);
