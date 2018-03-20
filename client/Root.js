import './main.scss';
import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import Header from './components/Header';
import StatusPage from './pages/StatusPage';
import EventsPage from './pages/EventsPage';

class Root extends Component {

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Redirect exact from='/' to='/users' />
          <Route exact path='/users' component={StatusPage} />
          <Route path='/users/:id/type/:types' component={EventsPage} />
        </Switch>
      </div>
    );
  }
}


export default withRouter(Root);


