import './main.scss';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as reducers from './reducers';
import * as actions from './actions/UserActions';

class Root extends Component {


  componentDidMount() {
    this.props.fetchAgents();
  }

  render() {
    const agents = this.props.agents;
    return (
      <div>
        <h2>Simple Universal React Boilerplate</h2>
      </div>
    );
  }
}

Root.propTypes = {
  agents: PropTypes.object,
  fetchAgents: PropTypes.func
};

const mapStateToProps = (state) => ({
  agents: reducers.getAgents(state)
});

export default withRouter(connect(mapStateToProps, actions)(Root));


