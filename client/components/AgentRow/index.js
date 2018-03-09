import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import { TableCell, TableRow } from 'material-ui/Table';

import styles from './styles';

const AgentRow = ({ id, status }) => (
  <TableRow>
    <TableCell>{id}</TableCell>
    <TableCell>{status.type}</TableCell>
    <TableCell>{status.status}</TableCell>
    <TableCell>{status.message}</TableCell>
  </TableRow>
);


AgentRow.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string,
  status: PropTypes.object
};

export default withStyles(styles)(AgentRow);