import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const propTypes = {
    scrollable: PropTypes.bool,
    error: PropTypes.bool,
};

const defaultProps = {
    scrollable: false,
    error: false,
};

const ContainerWrapper = styled.div`
    border: 1px solid #cbcbcb;
    background-color: white;
    border-radius: 3px;
    margin-bottom: 24px;

    &:last-child {
        margin-bottom: 0;
    }

    ${({ scrollable }) => scrollable && css`
        overflow: auto;
    `}
    ${({ error }) => error && css`
        border-color: #f0949f;
    `}
`;

const Container = (props) => {
    const { scrollable, children, ...otherProps } = props;

    return (
        <ContainerWrapper scrollable={scrollable} {...otherProps}>
            {children}
        </ContainerWrapper>
    );
};

Container.propTypes = propTypes;
Container.defaultProps = defaultProps;

export default Container;
