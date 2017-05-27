import './main.scss';
import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as reducers from './reducers';


class Root extends Component {
  render() {
    const message = this.props.message;
    return (
      <div>
        <h2>Simple Universal React Boilerplate</h2>
        {message}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  message: reducers.getMessage(state)
});

export default withRouter(connect(mapStateToProps)(Root));

