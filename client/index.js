import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from './store';
import * as actionTypes from './constants/actionTypes';
import Root from './Root';

const store = configureStore();

const { message } = window.initialData;

if (message) {
  store.dispatch({
    type: actionTypes.DISPLAY_MESSAGE,
    message
  });
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));
