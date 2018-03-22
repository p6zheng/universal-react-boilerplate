import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions/UserActions';
import * as reducers from '../../reducers';

import { ApiTable, TableHeader } from 'ad-react-components';

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

  onClickHandler(id, type) {
    this.props.fetchEvents(id, type);
    this.props.history.push(`/users/${id}/type/${type}`);
  }

  createCell(content, row, idx) {
    return (
      <div onClick={this.onClickHandler.bind(this, row.agent_id, row.type)}>
        {content}
      </div>
    );
  }

  render() {
    const { agents } = this.props;

    return (
      <div className="table" >
        <ApiTable
          bordered
          rows={this.flattenAgentRows(agents)}
          onTableUpdate={() => {}}
          pagination={{currentPage: 1, nbPages: 4}}>
          <TableHeader name="agent_id" cellFormatter={this.createCell.bind(this)}>Agent ID</TableHeader>
          <TableHeader name="type" cellFormatter={this.createCell.bind(this)}>Type</TableHeader>
          <TableHeader name="status" cellFormatter={this.createCell.bind(this)}>Status</TableHeader>
          <TableHeader name="message" cellFormatter={this.createCell.bind(this)}>Message</TableHeader>
        </ApiTable>
      </div>
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

export default connect(mapStateToProps, actions)(withRouter(AgentTable));

