import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import path from 'path';
import morgan from 'morgan';

// Import required modules
import config from './config';
import logger from './logger';
import * as actionTypes from '../client/constants/actionTypes';

// Initialize express app
const app = express();

// Prevent node from reporting scss file import error
require.extensions['.scss'] = function () {};

// Import the root moudule after disable scss import
const Root = require('../client/Root').default;

// Set port number
app.set('port', config.server.port);


// Run Webpack dev server in development mode
if (process.env.NODE_ENV === 'production') {
  app.set('views', path.resolve(__dirname, '../dist'));
  app.use(express.static(path.resolve(__dirname, '../dist')));
} else {
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpack = require('webpack');
  const webconfig = require('../webpack.config.dev.js');
  app.use(webpackMiddleware(webpack(webconfig), {
    publicPath: '/',
    serverSideRender: true,
    stats: {
      colors: true,
      chunks: false,
      assets: false,
    }})
  );
}

// React And Redux Setup
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { configureStore } from '../client/store';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';


// Set native promises as mongoose promise
mongoose.Promise = global.Promise;

// Connect to mongodb
if(process.env.NODE_ENV !== 'test') mongoose.connect(config.mongo.url);
mongoose.connection.on('connected', () => {
  logger.info('MongoDB connection established!');
});
mongoose.connection.on('error', () => {
  logger.error('MongoDB connection error. Please make sure MongoDB is running.');
  process.exit();
});

// Express configuration
app.set('view engine', 'ejs');
app.use(morgan(':method :url :status :res[content-length] - :response-time ms',
  { 'stream': logger.stream }));
app.use(express.static(__dirname + '/uploads'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));

// Print out worker information
app.use((req, res, next) => {
  const cluster = require('cluster');
  if (cluster.isWorker) logger.info(`Worker ${cluster.worker.id} received request`);
  next();
});

// Setup Cookie and Session
const MongoStore = require('connect-mongo')(session);
app.use(cookieParser(config.cookie.secret));
app.use(session({
  secret: config.session.secret,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    url: config.mongo.url,
    autoReconnect: true
  })
}));


// Server Side Rendering based on routes matched by React-router v4
app.use((req, res, next) => {
  const message = 'This message is passed from the backend';

  const store = configureStore();

  store.dispatch({
    type: actionTypes.DISPLAY_MESSAGE,
    message
  });

  const context = {};

  let markup = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <Root />
      </StaticRouter>
    </Provider>
  );


  if (context.url) {
    res.writeHead(301, {
      Location: context.url
    });
    res.end();
  } else{
    if (context.missed) {
      next();
    }
    res.render('index', {
      initialMockup: markup,
      initialData: {
        message
      }
    });
  }
});

export default app;


