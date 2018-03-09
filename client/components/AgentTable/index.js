import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import { TableBody, TableHead, TableRow, TableCell } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

import AgentRow from '../AgentRow/index';
import styles from './styles';
import {connect} from 'react-redux';
import * as actions from '../../actions/UserActions';
import * as reducers from '../../reducers';

class AgentTable extends Component {

  componentDidMount() {
    debugger;
    this.props.fetchAgents();
  }

  renderAgentRows(agents) {
    if (agents)
      agents.map(
        agent =>
          <AgentRow
            key={agent.id}
            id={agent.id}
            status={agent.status}
          />
      );
  }

  render() {
    const { agents } = this.props.agents;
    return (
      <Paper>
        <TableHead>
          <TableRow>
            <TableCell>Agent ID</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Message</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.renderAgentRows(agents)}
        </TableBody>
      </Paper>
    );
  }
}

AgentTable.propTypes = {
  classes: PropTypes.object.isRequired,
  agents: PropTypes.array.isRequired,
  fetchAgents: PropTypes.func
};

const mapStateToProps = (state) => ({
  agents: reducers.getAgents(state)
});

export default connect(mapStateToProps, actions)(AgentTable);

