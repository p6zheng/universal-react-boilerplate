import './main.scss';
import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import SecondaryNav from './components/SecondaryNav';
import StatusPage from './pages/StatusPage';
import EventsPage from './pages/EventsPage';
import Footer from './components/Footer';

class Root extends Component {
  getActiveTab() {
    return this.props.location === "/user" ? "status": "events"
  }

  render() {
    return (
      <div>
        <SecondaryNav activeTab={this.getActiveTab()}/>
        <div className="wrapper">
          <Switch>
            <Redirect exact from='/' to='/users' />
            <Route exact path='/users' component={StatusPage} />
            <Route path='/users/:id/type/:types' component={EventsPage} />
          </Switch>
          <Footer/>
        </div>
      </div>
    );
  }
}


export default withRouter(Root);


