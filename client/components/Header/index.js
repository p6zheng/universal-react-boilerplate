import React, { Component } from 'react';

import UniversalHeader from 'universal-header';

var universalHeader =  new UniversalHeader();

universalHeader.configure({
  widgets: ['Header'],
  userUUID: '123123',
  static: true,
  staticData: {
    CurrentUser: {
      uuid: "213123123",
    },
    UserInfo: {
      given_name: "Pengfei"
    },
    CHANNEL_SETTINGS: {}
  },
  marketUrl: 'http://marketplace.appdirect.com'
});

universalHeader.configure({
  renderTo: '#universalHeader',
}, 'header');

universalHeader.init();

module.exports = universalHeader;
