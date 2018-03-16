import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { TableBody, TableHead, TableRow, TableCell } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

import AgentRow from '../AgentRow';
import {connect} from 'react-redux';
import * as actions from '../../actions/UserActions';
import * as reducers from '../../reducers';

class AgentTable extends Component {

  componentDidMount() {
    this.props.fetchAgents();
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
      <Paper>
        <TableHead>
          <TableRow>
            <TableCell>Agent ID</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Status</TableCell>
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

