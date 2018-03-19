import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { TableHeader, Table } from '../Table';


class EventsTable extends Component {

  renderAgentRows(events) {
    if (events != null)
      return events.map(
        e => (
          <tr>
            <td>{e.id}</td>
            <td>{e.resource_type}</td>
            <td>{e.timestamp}</td>
            <td>{e.resource_action}</td>
            <td>{e.payload}</td>
          </tr>
        )
      );
  }

  render() {
    const { events } = this.props;
    return (
      <Table>
        <TableHeader>Agent ID</TableHeader>
        <TableHeader>Type</TableHeader>
        <TableHeader>Create Time</TableHeader>
        <TableHeader>Action</TableHeader>
        <TableHeader>payload</TableHeader>
        <tbody>
          {this.renderAgentRows(events)}
        </tbody>
      </Table>
    );
  }
}

EventsTable.propTypes = {
  events: PropTypes.array.isRequired
};

export default EventsTable;

