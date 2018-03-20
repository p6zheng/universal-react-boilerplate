import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    rowKeyColumn: PropTypes.string,
    rows: PropTypes.arrayOf(
        PropTypes.object
    ).isRequired,
};

const defaultProps = {
    rowKeyColumn: '',
};

const byTypeName = typeName => x => typeName === x.type.name;
const findFilters = children =>
    React.Children.toArray(children).find(byTypeName('TableFilters'));

export default (Component) => {
    class Filterable extends React.PureComponent {
        constructor(props) {
            super(props);

            const filters = findFilters(props.children);
            this.handleSearchChange = this.handleSearchChange.bind(this);
            this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
            this.searchFields = filters ? filters.props.searchFields : null;
            this.searchFn = filters ? filters.props.searchFn : null;
            this.state = this.getState(props);
        }

        componentWillReceiveProps(nextProps) {
            this.setState(prevState => (
                this.isFilterable()
                    ? this.getState(nextProps, prevState.searchFilter, prevState.searchValue)
                    : {}
            ));
        }

        getState(props, searchFilter, searchValue = '', shouldFilter = false) {
            if (!this.isFilterable()) return {};

            // The first time the component is initialized, there will be no state, and we get
            // the rows from the props. After that, we get the the rows from the state.

            let rowsFiltered = this.state ? this.state.rows : props.rows;
            if (this.searchFn && searchValue && shouldFilter) {
                rowsFiltered = this.searchFn(props.rows, searchValue);
            } else if (shouldFilter) {
                // eslint-disable-next-line no-nested-ternary
                let realSearchFields = this.searchFields
                    ? Array.isArray(this.searchFields) ? this.searchFields : [this.searchFields]
                    : props.rows.length > 0 ? Object.keys(props.rows[0]) : null;

                if (props.rowKeyColumn) {
                    realSearchFields = realSearchFields.filter(e => e !== props.rowKeyColumn);
                }

                rowsFiltered = props.rows.reduce((memo, row) => {
                    if (realSearchFields.some(field =>
                        String(row[field]).toLowerCase().includes(searchValue.toLowerCase())
                    )) {
                        memo.push(row);
                        return memo;
                    }
                    return memo;
                }, []);
            }

            return {
                searchFilter,
                searchValue,
                rows: rowsFiltered,
            };
        }

        isFilterable() {
            return !!findFilters(this.props.children);
        }

        handleSearchChange(shouldFilter, searchFilter, searchValue) {
            this.setState(this.getState(this.props, searchFilter, searchValue, shouldFilter));
        }

        handleSearchSubmit(searchFilter, searchValue) {
            this.setState(this.getState(this.props, searchFilter, searchValue, true));
        }

        render() {
            /* eslint-disable react/jsx-no-bind */

            const { children, rows, ...otherProps } = this.props;
            const realRows = (this.state && this.state.rows) || rows;

            return (
                <Component rows={realRows} {...otherProps}>
                    {React.Children.map(children, (child) => {
                        if (!child) return null;
                        if (child.type.name !== 'TableFilters') return child;
                        return React.cloneElement(child, {
                            onSearchChange: this.handleSearchChange.bind(this, child.props.instantSearch),
                            onSearchSubmit: this.handleSearchSubmit,
                            searchFilter: this.state.searchFilter,
                            searchValue: this.state.searchValue,
                        });
                    })}
                </Component>
            );
        }
    }
    Filterable.propTypes = propTypes;
    Filterable.defaultProps = defaultProps;
    return Filterable;
};
