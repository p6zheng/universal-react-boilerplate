import './main.scss';
import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import Header from './components/Header';
import Main from './pages/Main';

class Root extends Component {

  render() {
    return (
      <div>
        <Header />
        <Main />
      </div>
    );
  }
}


export default withRouter(Root);


