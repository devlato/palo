'use strict';


import middleware from 'webpack-dev-middleware';


export default {
  register(app) {
    let config = app.config().options.webpack || {};
    let compiler = config.compiler;

    app.server().use(middleware(compiler, {
      noInfo: true,
      publicPath: config.options.output.publicPath
    }));
  }
};
