import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    rows: PropTypes.arrayOf(
        PropTypes.object
    ).isRequired,
    sortable: PropTypes.bool,
    onTableUpdate: PropTypes.func.isRequired,
    // arguments (page number based 1, {isAscending: bool, sortHEader: string} )
};

const defaultProps = {
    sortable: false,
};

export default (Component) => {
    class ApiSortable extends React.PureComponent {
        constructor(props) {
            super(props);

            this.handleClickColumn = this.handleClickColumn.bind(this);

            if (props.sortable) {
                this.state = {
                    sortHeader: null,
                    sortAscending: true,
                };
            }
        }

        handleClickColumn(e, columnName) {
            if (columnName) { // handle search input for some reason, make sure its a column
                const sortAscending = this.state.sortHeader === columnName ? !this.state.sortAscending : true;
                this.setState({
                    sortHeader: columnName,
                    sortAscending,
                });
                this.props.onTableUpdate(1, { sorting: { sortAscending, columnName } });
            }
        }

        renderTableHeaders() {
            const { children, sortable } = this.props;

            if (!sortable) {
                return children;
            }

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

        render() {
            const { rows, ...rest } = this.props;
            delete rest.sortable;
            delete rest.sortableColumns;

            return (
                <Component rows={rows} {...rest}>
                    {this.renderTableHeaders()}
                </Component>
            );
        }
    }

    ApiSortable.propTypes = propTypes;
    ApiSortable.defaultProps = defaultProps;
    return ApiSortable;
};
