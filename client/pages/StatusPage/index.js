import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AgentTable from '../../components/AgentTable';
import { connect } from 'react-redux';
import * as actions from '../../actions/UserActions';
import * as reducers from '../../reducers';

import SideNav from '../../components/SideNav';
import { withRouter } from 'react-router-dom';

class StatusPage extends Component {

  componentDidMount() {
    if (this.props.agents.length === 0) this.props.fetchAgents();
  }

  onRowClick(id, type) {
    this.props.fetchEvents(id, type);
    this.props.history.push(`/users/${id}/type/${type}`);
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
    return (
      <div className="main">
        <SideNav />
        <AgentTable
          onRowClick={this.onRowClick.bind(this)}
          page={{currentPage: 1, nbPages: 4}}
          rows={this.flattenAgentRows(this.props.agents)}
        />
      </div>
    );
  }
}

StatusPage.propTypes = {
  agents: PropTypes.array.isRequired,
  fetchAgents: PropTypes.func,
  fetchEvents: PropTypes.func,
  rows: PropTypes.array
};

const mapStateToProps = (state) => ({
  agents: reducers.getAgents(state)
});

export default connect(mapStateToProps, actions)(withRouter(StatusPage));