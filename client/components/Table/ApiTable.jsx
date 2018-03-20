import React from 'react';
import PropTypes from 'prop-types';

import Pagination from '../Pagination';
import TableFooter from './TableFooter';
import Table from './TableContainer';

import makeApiSortable from './ApiSortable';
import makeApiSelectable from './ApiSelectable';

const paginationTypes = PropTypes.shape({
  nbPages: PropTypes.number,
  currentPage: PropTypes.number,
});

const propTypes = {
  footerLabel: PropTypes.string,
  pagination: paginationTypes,
  onTableUpdate: PropTypes.func.isRequired,
  rows: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired,
};

const defaultProps = {
  footerLabel: '',
  pagination: {
    nbPages: 1,
    currentPage: 1,
  },
};

const ApiTable = (props) => {
  const {footerLabel, pagination, children, onTableUpdate, ...rest} = props;
  return (
    <Table {...rest}>
      {children}
      {pagination.nbPages > 1 && (
        <TableFooter label={footerLabel}>
          <Pagination
            nbPages={pagination.nbPages}
            currentPage={pagination.currentPage}
            onChange={onTableUpdate}
          />
        </TableFooter>
      )}
    </Table>
  );
};

ApiTable.propTypes = propTypes;
ApiTable.defaultProps = defaultProps;

export default [makeApiSelectable, makeApiSortable].reduce((memo, cur) => cur(memo), ApiTable);
