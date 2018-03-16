import './main.scss';
import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import Header from './components/Header';
import StatusPage from './pages/StatusPage';
import EventsPage from './pages/EventsPage';

class Root extends Component {

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/users' component={StatusPage} />
          <Route path="/users/:id/type/:types" component={EventsPage} />
        </Switch>
        <footer />
      </div>
    );
  }

  // render() {
  //   return (
  //     <div>
  //       <Header />
  //       <Main />
  //     </div>
  //   );
  // }
}


export default withRouter(Root);


