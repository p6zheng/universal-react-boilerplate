import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EventsTable from '../../components/EventsTable';
import {connect} from 'react-redux';
import * as actions from '../../actions/UserActions';
import * as reducers from '../../reducers';



class EventsPage extends Component {

  render() {
    return (
      <div>
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