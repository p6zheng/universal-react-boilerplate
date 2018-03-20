import React from 'react';
import PropTypes from 'prop-types';
import Pagination from '../Pagination';
import TableFooter from './TableFooter';

const propTypes = {
    footerLabel: PropTypes.string,
    nbItemsPerPage: PropTypes.number,
    rows: PropTypes.arrayOf(
        PropTypes.object
    ).isRequired,
    pageable: PropTypes.bool,
};

const defaultProps = {
    footerLabel: '',
    nbItemsPerPage: 10,
    pageable: false,
};

function getState(props, page) {
    const { nbItemsPerPage } = props;

    const nbPages = Math.ceil(props.rows.length / props.nbItemsPerPage);

    // eslint-disable-next-line no-nested-ternary
    const pageValue = page > nbPages
        ? nbPages
        : page < 1 ? 1 : page;

    const startSlice = (pageValue - 1) * nbItemsPerPage;
    const endSlice = startSlice + nbItemsPerPage;

    return {
        currentPage: pageValue,
        rows: props.rows.slice(startSlice, endSlice),
        nbPages,
    };
}

export default (Component) => {
    class Pageable extends React.PureComponent {
        constructor(props) {
            super(props);

            this.handleChange = this.handleChange.bind(this);

            if (props.pageable) {
                this.state = getState(props, 1);
            }
        }

        componentWillReceiveProps(nextProps) {
            this.setState(prevState => (
                nextProps.pageable
                    ? getState(nextProps, prevState.currentPage)
                    : {}
            ));
        }

        handleChange(page) {
            this.setState(getState(this.props, page));
        }

        render() {
            const {
                footerLabel, rows, pageable,
                children, ...otherProps
            } = this.props;
            const realRows = (this.state && this.state.rows) || rows;

            const rest = { ...otherProps };
            delete rest.nbItemsPerPage;

            return (
                <Component rows={realRows} {...rest}>
                    {children}
                    {pageable && this.state.nbPages > 1 && (
                        <TableFooter label={footerLabel}>
                            <Pagination
                                nbPages={this.state.nbPages}
                                currentPage={this.state.currentPage}
                                onChange={this.handleChange}
                            />
                        </TableFooter>
                    )}
                </Component>
            );
        }
    }
    Pageable.propTypes = propTypes;
    Pageable.defaultProps = defaultProps;
    return Pageable;
};
