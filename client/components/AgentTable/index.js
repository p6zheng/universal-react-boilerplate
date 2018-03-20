import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { TableHeader, ApiTable } from '../Table';

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

  renderAgentRows(agents) {
    return agents.map(
      ({id, service}) =>
        <AgentRow
          key={id}
          id={id}
          service={service}
        />
    );
  }

  onRowClick({id, type}) {
    this.props.fetchEvents(id, type);
    this.props.history.push(`/users/${id}/type/${type}`);
  }

  render() {
    const { agents } = this.props;

    return (
      <ApiTable
        bordered
        onRowClick={this.onRowClick}>
        <TableHeader name="agent_id">Agent ID</TableHeader>
        <TableHeader name="type">Type</TableHeader>
        <TableHeader name="status">Status</TableHeader>
        <TableHeader name="message">Message</TableHeader>
        <tbody>
          {this.renderAgentRows(agents)}
        </tbody>
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

