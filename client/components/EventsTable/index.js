import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { TableHeader, ApiTable } from 'ad-react-components';


class EventsTable extends Component {

  render() {
    const { events } = this.props;
    return (
      <ApiTable
        rows={events}
        onTableUpdate={() => {}}>
        <TableHeader name="id">Agent ID</TableHeader>
        <TableHeader name="timestamp">Type</TableHeader>
        <TableHeader name="resource_type">Create Time</TableHeader>
        <TableHeader name="resource_action">Action</TableHeader>
        <TableHeader name="payload">payload</TableHeader>
      </ApiTable>
    );
  }
}

EventsTable.propTypes = {
  events: PropTypes.array.isRequired
};

export default EventsTable;

