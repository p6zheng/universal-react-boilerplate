import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { TableBody, TableHead, TableRow, TableCell } from 'material-ui/Table';
import Paper from 'material-ui/Paper';


class EventsTable extends Component {

  renderAgentRows(events) {
    if (events != null)
      return events.map(
        e => (
          <TableRow>
            <TableCell>{e.id}</TableCell>
            <TableCell>{e.resource_type}</TableCell>
            <TableCell>{e.timestamp}</TableCell>
            <TableCell>{e.resource_action}</TableCell>
            <TableCell>{e.payload}</TableCell>
          </TableRow>
        )
      );
  }

  render() {
    const { events } = this.props;
    return (
      <Paper>
        <TableHead>
          <TableRow>
            <TableCell>Agent ID</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Create Time</TableCell>
            <TableCell>Action</TableCell>
            <TableCell>payload</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.renderAgentRows(events)}
        </TableBody>
      </Paper>
    );
  }
}

EventsTable.propTypes = {
  events: PropTypes.array.isRequired
};

export default EventsTable;

