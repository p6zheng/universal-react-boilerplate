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
      rows: [],
      status: "All",
      type: "All"
    };
  }

  componentDidMount() {
    if (this.props.agents.length === 0) {
      this.props.fetchAgents()
        .then(() => {
          this.initializeRows(1);
        });
    } else {
      this.initializeRows(1);
    }
  }

  onRowClick(id, type) {
    this.props.fetchEvents(id, type);
    this.props.history.push(`/users/${id}/type/${type}`);
  }

  getAgentRows(status, type) {
    const { agents } = this.props;
    return agents
      .reduce((acc, agent) =>
        acc.concat(
          agent.service.map(row =>
            ({
              agent_id: agent.id,
              type: row.type,
              status: row.status,
              message: row.message
            })
          )
        ), [])
      .filter(row =>
        (row.status === status || status === "All")
        && (row.type === type || type === "All"));
  }

  initializeRows(pageNum, status, type) {
    const totalRows = this.getAgentRows(status || this.state.status, type || this.state.type);
    const page = {
      currentPage: pageNum,
      nbPages: Math.ceil(totalRows.length / 40)
    };
    this.setState({
      rows: totalRows.slice((page.currentPage - 1) * 30, page.currentPage * 30),
      page
    });
  }

  onStatusFilter(status) {
    this.initializeRows(1, status, this.state.type);
    this.setState({
      status
    });
  }

  onTypeFilter(type) {
    this.initializeRows(1, this.state.status, type);
    this.setState({
      type
    });
  }

  render() {
    const { page, rows, status, type } = this.state;
    return (
      <div className="main">
        <SideNav
          onStatusFilter={this.onStatusFilter.bind(this)}
          onTypeFilter={this.onTypeFilter.bind(this)}
          status={status}
          type={type}
        />
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