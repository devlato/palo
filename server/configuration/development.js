'use strict';


import _ from 'lodash';
import Webpack from 'webpack';


export default (config) => {
  let webpackConfig;
  let Logger = config.options.logger;

  try {
    webpackConfig = require(config.paths.webpackConfigPath);
    Logger.info(`Webpack configuration has been found by the path "${config.paths.webpackConfigPath}"...`);
  } catch (e) {
    Logger.info(`No webpack configuration with the path "${config.paths.webpackConfigPath}" found, skipping"...`);
    Logger.error(e.stack);
  }

  return {
    webpack: _.merge({}, config.options.webpack, {
      options: webpackConfig,
      compiler: Webpack(webpackConfig)
    }),
    server: {
      environment: 'development'
    },
    middlewares: {
      before: [
        'webpackDev',
        'webpackHot',
        'session',
        'passport',
        'pureSend',
        'jsonRequest',
        'safeRequest',
        'requestTime',
        'serveStatic'
      ],
      after: [
        'requestException'
      ]
    }
  };
};
