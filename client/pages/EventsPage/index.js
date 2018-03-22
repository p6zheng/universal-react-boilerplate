import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as actions from '../../actions/UserActions';
import * as reducers from '../../reducers';

import EventsTable from '../../components/EventsTable';
import SideNav from '../../components/SideNav';


class EventsPage extends Component {

  render() {
    return (
      <div className="main">
        <SideNav/>
        <EventsTable events={this.props.events}/>
      </div>
    );
  }
}

EventsPage.propTypes = {
  events: PropTypes.array.isRequired
};


const mapStateToProps = (state) => ({
  events: reducers.getEvents(state)
});

export default connect(mapStateToProps, actions)(EventsPage);