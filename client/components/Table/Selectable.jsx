import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isEqual from 'lodash/isEqual';
import TableHeader from './TableHeader';
import Checkbox from '../Forms/Checkbox';
import Radio from '../Forms/Radio';

const propTypes = {
    exclusive: PropTypes.bool,
    onSelectionChanged: PropTypes.func,
    rowKeyColumn: PropTypes.string,
    rows: PropTypes.arrayOf(
        PropTypes.object
    ).isRequired,
    selectable: PropTypes.bool,
};

const defaultProps = {
    exclusive: false,
    rowKeyColumn: '',
    onSelectionChanged: () => {
        // do nothing
    },
    selectable: false,
};

export default (Component) => {
    class Selectable extends React.PureComponent {
        constructor(props) {
            super(props);

            this.handleChangeHeaderCheckbox = this.handleChangeHeaderCheckbox.bind(this);
            this.handleChangeRowSelect = this.handleChangeRowSelect.bind(this);
            this.builRowSelect = this.builRowSelect.bind(this);

            if (props.selectable) {
                this.state = {
                    headerSelected: false,
                    selectedRows: [],
                };
            }
        }

        componentWillReceiveProps(nextProps) {
            if (nextProps.selectable) {
                const { rows, rowKeyColumn } = nextProps;

                if (!isEqual(this.props.rows, rows)) {
                    // keep only existing rows
                    const selectedRows = this.state.selectedRows
                        .filter(k => rows
                            .map((row, i) => row[rowKeyColumn] || row.key || i)
                            .indexOf(k) > -1
                        );

                    this.setState({
                        headerSelected: selectedRows.length === rows.length,
                        selectedRows,
                    });

                    nextProps.onSelectionChanged(selectedRows);
                }
            }
        }

        handleChangeHeaderCheckbox(e) {
            const { rowKeyColumn, rows } = this.props;
            const selected = e.target.checked;
            const selectedRows = selected
                ? rows.map((row, idx) => row[rowKeyColumn] || row.key || idx)
                : [];

            this.setState({
                headerSelected: selected,
                selectedRows,
            });

            this.props.onSelectionChanged(selectedRows);
        }

        handleChangeRowSelect(e) {
            const { exclusive, rows } = this.props;
            const rowId = JSON.parse(e.target.dataset.ad).id;
            const rowChecked = e.target.checked;
            const selectedRows = [...this.state.selectedRows];

            if (exclusive) {
                // radio button
                selectedRows.length = 0;
                selectedRows.push(rowId);
            } else if (rowChecked) {
                selectedRows.push(rowId);
            } else {
                const idx = selectedRows.indexOf(rowId);
                selectedRows.splice(idx, 1);
            }

            this.setState({
                headerSelected: rows.length === selectedRows.length,
                selectedRows,
            });

            this.props.onSelectionChanged(selectedRows);
        }

        builRowSelect(content, row, idx) {
            const rowKey = row[this.props.rowKeyColumn] || row.key || idx;
            const isSelected = this.state.selectedRows.indexOf(rowKey) > -1;

            if (this.props.exclusive) {
                return (
                    <Radio
                        id={`radio-${rowKey}`}
                        data-ad={JSON.stringify({ id: rowKey })}
                        value={rowKey}
                        checked={isSelected}
                        onChange={this.handleChangeRowSelect}
                    />
                );
            }
            return (
                <Checkbox
                    id={`checkbox-${rowKey}`}
                    data-ad={JSON.stringify({ id: rowKey })}
                    checked={isSelected}
                    onChange={this.handleChangeRowSelect}
                />
            );
        }

        render() {
            const { exclusive, rows, selectable, children, rowKeyColumn, ...otherProps } = this.props;

            const rest = { ...otherProps };
            delete rest.onSelectionChanged;

            const realRows = selectable
                ? rows.map((row, idx) => {
                    const rowKey = row[rowKeyColumn] || row.key || idx;
                    return {
                        ...row,
                        className: classNames({
                            'adb-is-selected': this.state.selectedRows.indexOf(rowKey) > -1,
                        }, row.className),
                    };
                })
                : rows;

            return (
                <Component rows={realRows} {...rest}>
                    {selectable && (
                        <TableHeader name="checkbox-header-cell" cellFormatter={this.builRowSelect}>
                            {!exclusive && (
                                <Checkbox
                                    id="checkbox-header"
                                    checked={this.state.headerSelected}
                                    onChange={this.handleChangeHeaderCheckbox}
                                />
                            )}
                        </TableHeader>
                    )}
                    {children}
                </Component>
            );
        }
    }
    Selectable.propTypes = propTypes;
    Selectable.defaultProps = defaultProps;
    return Selectable;
};
