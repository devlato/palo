#!/usr/bin/env babel-node


'use strict';


process.chdir(__dirname);


import App from '@/core/bootstrap';


try {
  let app = new App();
  app.run();
} catch (e) {
  console.log('Failed to start app: ', e.message || '[no message]');
  console.error(e.stack);
}
