'use strict';


export default {
  server: {
    environment: 'production'
  },
  middlewares: {
    before: [
      'session',
      'passport',
      'pureSend',
      'jsonRequest',
      'safeRequest',
      'requestTime'
    ],
    after: [
      'requestException'
    ]
  }
};
