import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AgentTable from '../../components/AgentTable';
import { connect } from 'react-redux';
import * as actions from '../../actions/UserActions';
import * as reducers from '../../reducers';

import SideNav from '../../components/SideNav';


class StatusPage extends Component {

  render() {
    return (
      <div>
        <SideNav />
        <AgentTable/>
      </div>
    );
  }
}

StatusPage.propTypes = {
  events: PropTypes.array.isRequired
};


const mapStateToProps = (state) => ({
  events: reducers.getEvents(state)
});

export default connect(mapStateToProps, actions)(StatusPage);