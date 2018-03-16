import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as actions from '../../actions/UserActions';

import { TableCell, TableRow } from 'material-ui/Table';
import {connect} from 'react-redux';
import * as reducers from '../../reducers';

import { withRouter } from 'react-router-dom';

class AgentRow extends Component {
  onClickHandler(id ,type) {
    this.props.fetchEvents(id, type);
    this.props.history.push(`/users/${id}/type/${type}`);
  }

  render() {
    const {id, service} = this.props;
    return service.map(
      ({status, type, message}) => (
        <TableRow key={id + type} onClick={() => this.onClickHandler(id, type).bind(this)}>
          <TableCell>{id}</TableCell>
          <TableCell>{type}</TableCell>
          <TableCell>{status}</TableCell>
          <TableCell>{message}</TableCell>
        </TableRow>
      )
    );
  }
}

AgentRow.propTypes = {
  id: PropTypes.string,
  service: PropTypes.array,
  fetchEvents: PropTypes.func
};

const mapStateToProps = (state) => ({
  agents: reducers.getAgents(state)
});

export default connect(mapStateToProps, actions)(withRouter(AgentRow));