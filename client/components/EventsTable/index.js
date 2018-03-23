import React from 'react';
import PropTypes from 'prop-types';

import { TableHeader, ApiTable, TableFilters } from 'ad-react-components';

const EventsTable = ({ events, page }) => (
  <div className="content" >
    <ApiTable
      rows={events}
      bordered
      onTableUpdate={() => {}}
      pagination={page}>
      <TableHeader name="id">Agent ID</TableHeader>
      <TableHeader name="resource_type">Create Time</TableHeader>
      <TableHeader name="timestamp">Type</TableHeader>
      <TableHeader name="resource_action">Action</TableHeader>
      <TableHeader name="payload">payload</TableHeader>
      <TableFilters showSearch searchDebounceDelay={700} onSearchSubmit={() => {}} />
    </ApiTable>
  </div>
);

EventsTable.propTypes = {
  events: PropTypes.array.isRequired,
  page: PropTypes.object.isRequired
};

export default EventsTable;

