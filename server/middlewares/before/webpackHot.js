'use strict';


import middleware from 'webpack-hot-middleware';


export default {
  register(app) {
    let compiler = app.config().options.webpack.compiler;

    app.server().use(middleware(compiler));
  }
};
