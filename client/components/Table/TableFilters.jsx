import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import debounce from 'lodash/debounce';

import SearchField from '../Forms/SearchField';

const propTypes = {
    className: PropTypes.string,
    instantSearch: PropTypes.bool,
    onSearchChange: PropTypes.func,
    onSearchSubmit: PropTypes.func,
    searchFields: PropTypes.oneOfType([ // eslint-disable-line react/require-default-props
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string),
    ]),
    searchFn: PropTypes.func, // eslint-disable-line react/require-default-props
    searchLabel: PropTypes.string,
    showSearch: PropTypes.bool,
    searchValue: SearchField.propTypes.value,
    searchFilters: SearchField.propTypes.filters,
    selectedSearchFilter: SearchField.propTypes.selectedFilter,
    searchDebounceDelay: PropTypes.number,
};

const defaultProps = {
    className: '',
    instantSearch: false,
    searchLabel: 'Search',
    searchValue: null,
    searchFilters: [],
    selectedSearchFilter: null,
    onSearchChange: () => {},
    onSearchSubmit: () => {},
    showSearch: false,
    searchDebounceDelay: null,
};

// TODO: Investigate overlap with Container / Container Header / Container Header Items
const FiltersContainer = styled.div`
    background-color: whitesmoke;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    border-top: 1px solid #cbcbcb;
    border-bottom: 1px solid #cbcbcb;
    border-top-style: hidden;
    padding: 10px;
    color: #575757;
    box-sizing: border-box;
`;

const FiltersHeader = styled.menu`
    text-align: justify;
    font-size: 0;
    line-height: 0;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    border: 0;

    &::after {
        display: inline-block;
        width: 100%;
        content: '';
    }
`;

const FiltersHeaderItem = styled.div`
    display: inline-block;
    vertical-align: middle;
    text-align: left;
    line-height: 1em;
    margin: 0;
    color: #575757;
`;

const SearchHeaderItem = FiltersHeaderItem.extend`
    float: right;
`;

class TableFilters extends React.PureComponent {
    render() {
        const {
            className,
            instantSearch,
            onSearchChange,
            onSearchSubmit,
            searchLabel,
            searchValue,
            selectedSearchFilter,
            searchFilters,
            searchDebounceDelay,
            showSearch,
            children,
            ...otherProps
        } = this.props;

        const rest = { ...otherProps };
        delete rest.searchFields;
        delete rest.searchFn;

        return (
            <FiltersContainer className={className} {...rest}>
                <FiltersHeader>
                    {showSearch && (
                        <SearchHeaderItem>
                            <SearchField
                                onChange={searchDebounceDelay
                                    ? debounce(onSearchChange, searchDebounceDelay)
                                    : onSearchChange}
                                onSearch={onSearchSubmit}
                                placeholder={searchLabel}
                                value={searchValue}
                                selectedFilter={selectedSearchFilter}
                                filters={searchFilters}
                                small
                            />
                        </SearchHeaderItem>
                    )}
                    {children}
                </FiltersHeader>
            </FiltersContainer>
        );
    }
}

TableFilters.propTypes = propTypes;
TableFilters.defaultProps = defaultProps;

// because <Table> uses the name
TableFilters.displayName = 'TableFilters';
export default TableFilters;
