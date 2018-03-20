import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as actions from '../../actions/UserActions';
import { TableHeader } from 'ad-react-components';
import {connect} from 'react-redux';
import * as reducers from '../../reducers';

import { withRouter } from 'react-router-dom';


class AgentRow extends Component {
  onClickHandler(id ,type) {
    this.props.fetchEvents(id, type);
    this.props.history.push(`/users/${id}/type/${type}`);
  }

  render() {
    const { name, children } = this.props;
    return (
      <TableHeader
        name={name}
        cellFormatter={(id, type) => this.onClickHandler().apply(this, id, type)}>
        {children}
      </TableHeader>
    );
  }
}

AgentRow.propTypes = {
  name: PropTypes.string
};

const mapStateToProps = (state) => ({
  agents: reducers.getAgents(state)
});

export default connect(mapStateToProps, actions)(withRouter(AgentRow));