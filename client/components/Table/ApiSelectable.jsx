import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {has} from 'lodash';

import TableHeader from './TableHeader';
import Checkbox from '../Forms/Checkbox';

/*
    onSelectionChange({ rowKey: null | api custom data });
*/
const propTypes = {
  onSelectionChanged: PropTypes.func,
  rowKeyColumn: PropTypes.string,
  rows: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired,
  selectable: PropTypes.bool,
  selectedRows: PropTypes.shape({}),
};

const defaultProps = {
  rowKeyColumn: '',
  onSelectionChanged: () => {
  },
  selectable: false,
  selectedRows: {},
};

export default (Component) => {
  class ApiSelectable extends React.PureComponent {
    constructor(props) {
      super(props);

      this.handleChangeHeaderCheckbox = this.handleChangeHeaderCheckbox.bind(this);
      this.handleChangeRowSelect = this.handleChangeRowSelect.bind(this);
      this.buildRowSelect = this.buildRowSelect.bind(this);
      this.getSelectableRows = this.getSelectableRows.bind(this);
      this.allRowsSelected = false;
      this.selectedRowsCount = 0;
    }

    getSelectableRows() {
      let selectedItemOnPage = 0;
      this.allRowsSelected = false;

      const selectableRows = this.props.rows.map((row) => {
        const key = row[this.props.rowKeyColumn] || row.key;
        const isChecked = has(this.props.selectedRows, key);

        if (isChecked) {
          selectedItemOnPage += 1;
        }

        return {
          ...row,
          className: classNames({
            'adb-is-selected': isChecked,
          }, row.className),
        };
      });

      if (selectedItemOnPage === selectableRows.length && selectableRows.length !== 0) {
        this.allRowsSelected = true;
      }
      return selectableRows;
    }

    handleChangeHeaderCheckbox(e) {
      const {rowKeyColumn, rows, selectedRows} = this.props;
      if (e.target.checked) {
        rows.forEach((row) => {
          selectedRows[row[rowKeyColumn]] = null;
        });
      } else {
        rows.forEach((row) => {
          delete selectedRows[row[rowKeyColumn]];
        });
      }

      this.props.onSelectionChanged(selectedRows);
    }

    handleChangeRowSelect(e) {
      const rowId = JSON.parse(e.target.dataset.ad).id;
      const {selectedRows} = this.props;

      if (e.target.checked) {
        this.selectedRowsCount = this.selectedRowsCount - 1;
        selectedRows[rowId] = null;
      } else {
        this.selectedRowsCount = this.selectedRowsCount - 1;
        delete selectedRows[rowId];
      }

      this.props.onSelectionChanged(selectedRows);
    }

    buildRowSelect(content, row) {
      const rowKey = row[this.props.rowKeyColumn] || row.key;

      return (
        <Checkbox
          id={`checkbox-${rowKey}`}
          data-ad={JSON.stringify({id: rowKey})}
          checked={has(this.props.selectedRows, rowKey)}
          onChange={this.handleChangeRowSelect}
        />
      );
    }

    render() {
      const {rows, selectable, selectedRows, children, rowKeyColumn, ...otherProps} = this.props;
      const rest = {...otherProps};
      delete rest.onSelectionChanged;

      const realRows = selectable
        ? this.getSelectableRows()
        : rows;

      return (
        <Component rows={realRows} {...rest}>
          {selectable && (
            <TableHeader name="checkbox-header-cell" cellFormatter={this.buildRowSelect}>
              <Checkbox
                id="checkbox-header"
                checked={this.allRowsSelected}
                onChange={this.handleChangeHeaderCheckbox}
              />
            </TableHeader>
          )}
          {children}
        </Component>
      );
    }
  }

  ApiSelectable.propTypes = propTypes;
  ApiSelectable.defaultProps = defaultProps;
  return ApiSelectable;
};
