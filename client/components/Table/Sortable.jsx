import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    rows: PropTypes.arrayOf(
        PropTypes.object
    ).isRequired,
    sortable: PropTypes.bool,
};

const defaultProps = {
    sortable: false,
};

function initState(props) {
    return {
        rows: props.rows.slice(),
        sortHeader: null,
        sortAscending: true,
    };
}

function getDefaultSortFn(a, b, sortAscending) {
    return sortAscending
        ? a.localeCompare(b)
        : b.localeCompare(a);
}

export default (Component) => {
    class Sortable extends React.PureComponent {
        constructor(props) {
            super(props);

            this.handleClickColumn = this.handleClickColumn.bind(this);

            if (props.sortable) {
                this.state = initState(props);
            }
        }

        componentWillReceiveProps(nextProps) {
            if (nextProps.sortable) {
                const rows = this.state.sortHeader
                    ? this.getSortedRowsForColumn(this.state.sortAscending, this.state.sortHeader, nextProps.rows)
                    : nextProps.rows;

                this.setState({
                    rows,
                });
            }
        }

        getSortedRowsForColumn(sortAscending, columnName, rows) {
            const columns = React.Children.map(this.props.children, child => child.props);

            let sortFn = getDefaultSortFn;
            columns.some((col) => {
                if (col.name === columnName && col.sortFn) {
                    sortFn = col.sortFn;
                    return true;
                }
                return false;
            });

            return rows.sort((a, b) =>
                sortFn(
                    String(a[columnName]),
                    String(b[columnName]),
                    sortAscending
                )
            );
        }

        handleClickColumn(e, columnName) {
            const sortAscending = this.state.sortHeader === columnName ? !this.state.sortAscending : true;
            const rows = this.getSortedRowsForColumn(sortAscending, columnName, this.state.rows);
            this.setState({
                sortHeader: columnName,
                sortAscending,
                rows,
            });
        }

        renderTableHeaders() {
            const { children, sortable } = this.props;

            if (sortable) {
                return React.Children.map(children, (child) => {
                    const { sortHeader, sortAscending } = this.state;
                    const sorted = (sortHeader === child.props.name) && (!child.props.nosort);

                    // eslint-disable-next-line no-nested-ternary
                    const dataSortOrder = sorted && sortAscending
                        ? 'ascending'
                        : sorted && !sortAscending
                            ? 'descending'
                            : null;

                    return React.cloneElement(child, {
                        className: child.props.className,
                        'data-sortable': child.props.nosort === false ? true : undefined,
                        'data-sort-order': sorted ? dataSortOrder : undefined,
                        'data-sort-active': sorted ? true : undefined,
                        onClick: this.handleClickColumn,
                    });
                });
            }
            return children;
        }

        render() {
            const { rows, ...otherProps } = this.props;
            const realRows = (this.state && this.state.rows) || rows;

            const rest = { ...otherProps };
            delete rest.sortable;

            return (
                <Component rows={realRows} {...rest}>
                    {this.renderTableHeaders()}
                </Component>
            );
        }
    }
    Sortable.propTypes = propTypes;
    Sortable.defaultProps = defaultProps;
    return Sortable;
};
