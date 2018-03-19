import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Container } from '../Container';

const propTypes = {
  bordered: PropTypes.bool,
  className: PropTypes.string,
  rowHeading: PropTypes.bool,
  columnHeading: PropTypes.bool,
};

const defaultProps = {
  className: '',
  bordered: false,
  rowHeading: false,
  columnHeading: false,
};

// eslint-disable-next-line react/prop-types
const TableContainer = ({ children, bordered, className, rowHeading, columnHeading, ...otherProps }) => (
  bordered
    ? <Container className={className} {...otherProps}>{children}</Container>
    : <div className={className} {...otherProps}>{children}</div>
);

// Table cell styles are cascaded. Didn't want to have a class attribute
// on every table cell.

const TableWrapper = styled.div`
    font: normal 12px/1.4em "Helvetica Neue", Helvetica, Arial, sans-serif;
    min-width: 100%;
    text-align: left;
    border-collapse: collapse;
    border-spacing: 0;
    line-height: 1.6em;
    background-color: white;
    background-image: -webkit-linear-gradient(left, white, rgba(255, 255, 255, 0)), -webkit-linear-gradient(right, white, rgba(255, 255, 255, 0)), -webkit-linear-gradient(left, whitesmoke, rgba(245, 245, 245, 0)), -webkit-linear-gradient(right, whitesmoke, rgba(245, 245, 245, 0));
    background-position: 0 0, 100% 0, 0 0, 100% 0;
    background-repeat: no-repeat;
    background-size: 4em 100%, 4em 100%, 1em 100%, 1em 100%;
    background-attachment: local, local, scroll, scroll;
    overflow-x: auto;

    &:first-child {
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
    }

    &:last-child {
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
    }

    tbody tr {
        border-top: 1px solid #eaeaea;
        border-bottom: 1px solid #eaeaea;
    }

    tbody tr:first-child {
        border-top-color: #cbcbcb;
    }

    tbody tr:last-child {
        border-bottom-style: hidden;
    }

    td {
        padding: 6px 12px;
        vertical-align: middle;
        white-space: nowrap;
    }
`;

const byDisplayName = name => (
  x => (x.type ? x.type.displayName === name : false)
);

const byType = type => x => x.type === type;

const Table = (props) => {
  const { bordered, className, children, ...otherProps } = props;
  const childrenArray = React.Children.toArray(children);
  const headers = childrenArray.filter(byDisplayName('TableHeader'));
  const footer = childrenArray.find(byDisplayName('TableFooter'));
  const rows = childrenArray.find(byType('tbody'));

  return (
    <TableContainer className={className} bordered={bordered} {...otherProps}>
      <TableWrapper>
        <table style={{ borderCollapse: 'collapse', borderSpacing: 0, width: '100%' }}>
          <thead>
            <tr>
              {headers}
            </tr>
          </thead>
          {rows}
        </table>
      </TableWrapper>
      {footer}
    </TableContainer>
  );
};

Table.propTypes = propTypes;
Table.defaultProps = defaultProps;

export default Table;
