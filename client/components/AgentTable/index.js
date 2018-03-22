import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ApiTable, TableHeader, TableFilters } from 'ad-react-components';

class AgentTable extends Component {

  createCell(content, row, idx) {
    return (
      <div className="table_cell" onClick={this.props.onRowClick.bind(this, row.agent_id, row.type)}>
        {content}
      </div>
    );
  }

  render() {
    const {rows, page, onPageChange} = this.props;
    return (
      <div className="content" >
        <ApiTable
          bordered
          rows={rows}
          onTableUpdate={onPageChange}
          pagination={page}>
          <TableHeader name="agent_id" cellFormatter={this.createCell.bind(this)}>Agent ID</TableHeader>
          <TableHeader name="type" cellFormatter={this.createCell.bind(this)}>Type</TableHeader>
          <TableHeader name="status" cellFormatter={this.createCell.bind(this)}>Status</TableHeader>
          <TableHeader name="message" cellFormatter={this.createCell.bind(this)}>Message</TableHeader>
          <TableFilters showSearch searchDebounceDelay={700} onSearchSubmit={() => {}} />
        </ApiTable>
      </div>
    );
  }
}

AgentTable.propTypes = {
  onRowClick: PropTypes.func.isRequired,
  rows: PropTypes.array.isRequired,
  page: PropTypes.object.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default AgentTable;

