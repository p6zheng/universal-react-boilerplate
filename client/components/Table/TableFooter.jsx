import React from 'react';
import PropTypes from 'prop-types';
import { Subtitle } from '../Headings';
import { ContainerFooter, ContainerFooterItem } from '../Container';

const propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
};

const defaultProps = {
    className: '',
    label: '',
};

const TableFooter = (props) => {
    const { label, children, ...otherProps } = props;
    return (
        <ContainerFooter {...otherProps}>
            {label && (
                <ContainerFooterItem>
                    <Subtitle>{label}</Subtitle>
                </ContainerFooterItem>
            )}
            <ContainerFooterItem align="right">{children}</ContainerFooterItem>
        </ContainerFooter>
    );
};

TableFooter.propTypes = propTypes;
TableFooter.defaultProps = defaultProps;

// because <Table> uses the name
TableFooter.displayName = 'TableFooter';
export default TableFooter;
