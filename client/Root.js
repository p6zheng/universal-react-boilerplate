import './main.scss';
import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Nav from './components/Nav';
import StatusPage from './pages/StatusPage';
import EventsPage from './pages/EventsPage';
import Footer from './components/Footer';

class Root extends Component {

  render() {
    return (
      <div className="wrapper">
        <Nav />
        <Switch>
          <Redirect exact from='/' to='/users' />
          <Route exact path='/users' component={StatusPage} />
          <Route path='/users/:id/type/:types' component={EventsPage} />
        </Switch>
        <Footer/>
      </div>
    );
  }
}


export default withRouter(Root);


