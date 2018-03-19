import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const propTypes = {
    cellFormatter: PropTypes.func, // eslint-disable-line react/require-default-props
    name: PropTypes.string.isRequired,
    nosort: PropTypes.bool,
    onClick: PropTypes.func,
    sortFn: PropTypes.func, // eslint-disable-line react/require-default-props
};

const defaultProps = {
    nosort: false,
    onClick: null,
};

const Th = styled.th`
    color: #9c9c9c;
    text-align: left;
    padding: 6px 12px;
    white-space: nowrap;
    font-weight: normal;

    &[data-sortable] {
        user-select: none;
        white-space: nowrap;
        cursor: pointer;
    }

    &[data-sortable]:hover {
        color: #575757;
        background-color: rgba(45, 45, 45, 0.03);
    }

    &[data-sort-order]::after {
        display: inline-block;
        vertical-align: top;
        text-align: center;
        font-size: 1.14286em;
        font-family: AppDirectIcons;
        text-decoration: none;
        font-weight: normal;
        font-style: normal;
        font-variant: normal;
        text-transform: none;
        speak: none;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    &[data-sort-active] {
        color: #575757;
        font-weight: bold;
    }

    &[data-sort-order="ascending"]::after {
        content: "";
    }

    &[data-sort-order="descending"]::after {
        content: "";
    }

    &:first-child {
        border-top-left-radius: 3px;
    }

    &:last-child {
        border-top-right-radius: 3px;
    }
`;

const TableHeader = (props) => {
    const { name, onClick,
        nosort, children, ...otherProps } = props;

    const rest = { ...otherProps };
    delete rest.cellFormatter;
    delete rest.sortFn;

    const clickFn = !nosort && onClick
        ? e => onClick(e, name)
        : null;

    return (
        <Th onClick={clickFn} {...rest}>
            {children}
        </Th>
    );
};

TableHeader.propTypes = propTypes;
TableHeader.defaultProps = defaultProps;

// because <Table> uses the name
TableHeader.displayName = 'TableHeader';
export default TableHeader;
