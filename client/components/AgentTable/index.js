import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ApiTable } from 'ad-react-components';

import {connect} from 'react-redux';
import * as actions from '../../actions/UserActions';
import * as reducers from '../../reducers';

import AgentRow from '../AgentRow';

class AgentTable extends Component {

  componentDidMount() {
    this.props.fetchAgents();
  }

  flattenAgentRows(agents) {
    return agents
      .reduce((acc, agent) =>
        acc.concat(agent.service.map(row =>
          ({
            agent_id: agent.id,
            type: row.type,
            status: row.status,
            message: row.message
          })
        )), []);
  }

  render() {
    const { agents } = this.props;

    return (
      <ApiTable
        bordered
        rows={this.flattenAgentRows(agents)}
        onTableUpdate={() => {}}>
        <AgentRow name="agent_id">Agent ID</AgentRow>
        <AgentRow name="type">Type</AgentRow>
        <AgentRow name="status">Status</AgentRow>
        <AgentRow name="message">Message</AgentRow>
      </ApiTable>
    );
  }
}

AgentTable.propTypes = {
  agents: PropTypes.array.isRequired,
  fetchAgents: PropTypes.func
};

const mapStateToProps = (state) => ({
  agents: reducers.getAgents(state)
});

export default connect(mapStateToProps, actions)(AgentTable);

