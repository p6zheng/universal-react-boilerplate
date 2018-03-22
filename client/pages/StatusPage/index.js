import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AgentTable from '../../components/AgentTable';
import { connect } from 'react-redux';
import * as actions from '../../actions/UserActions';
import * as reducers from '../../reducers';

import SideNav from '../../components/SideNav';
import { withRouter } from 'react-router-dom';

class StatusPage extends Component {

  constructor() {
    super();
    this.state = {
      page: {
        currentPage: 1,
        ngPage: 1
      },
      rows: []
    };
  }

  componentDidMount() {
    if (this.state.rows.length === 0) {
      this.props.fetchAgents()
        .then(() => {
          this.initializeRows(1);
        });
    }
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

  initializeRows(pageNum) {
    const totalRows = this.flattenAgentRows(this.props.agents);
    const page = {
      currentPage: pageNum,
      nbPages: Math.ceil(totalRows.length / 40)
    };
    this.setState({
      rows: totalRows.slice((page.currentPage - 1) * 30, page.currentPage * 30),
      page
    });
  }

  render() {
    const { page, rows } = this.state;
    return (
      <div className="main">
        <SideNav />
        <AgentTable
          onRowClick={this.onRowClick.bind(this)}
          page={page}
          rows={rows}
          onPageChange={this.initializeRows.bind(this)}
        />
      </div>
    );
  }
}

StatusPage.propTypes = {
  agents: PropTypes.array.isRequired,
  fetchAgents: PropTypes.func,
  fetchEvents: PropTypes.func
};

const mapStateToProps = (state) => ({
  agents: reducers.getAgents(state)
});

export default connect(mapStateToProps, actions)(withRouter(StatusPage));