import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { TableHeader, Table } from '../Table';

import {connect} from 'react-redux';
import * as actions from '../../actions/UserActions';
import * as reducers from '../../reducers';
import {fetchAgents} from '../../actions/UserActions';

import AgentRow from '../AgentRow';

class AgentTable extends Component {

  componentDidMount() {
    this.props.fetchAgents();
  }

  onClickHandler() {
    // /this.props.fetchEvents(id, type);
    //this.props.history.push(`/users/${id}/type/${type}`);
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

  render() {
    const { agents } = this.props;

    return (
      <Table
        bordered>
        <TableHeader name="agent_id">Agent ID</TableHeader>
        <TableHeader name="type">Type</TableHeader>
        <TableHeader name="status">Status</TableHeader>
        <TableHeader name="message">Message</TableHeader>
        <tbody>
          {this.renderAgentRows(agents)}
        </tbody>
      </Table>
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

