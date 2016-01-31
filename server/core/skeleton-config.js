'use strict';


import Path from 'path';
import _ from 'lodash';
import {
    PROJECT_ROOT,
    BASE_DIR,
    DEFAULT_MODELS_DIR,
    DEFAULT_CONTROLLERS_DIR,
    DEFAULT_SERVICES_DIR,
    DEFAULT_MIDDLEWARES_DIR,
    DEFAULT_MIDDLEWARES_BEFORE_DIR,
    DEFAULT_MIDDLEWARES_AFTER_DIR,
    DEFAULT_CONFIGURATION_DIR,
    DEFAULT_MAIN_CONFIGURATION_PATH,
    DEFAULT_ENVIRONMENT_CONFIGURATION_PATH,
    DEFAULT_LOCAL_CONFIGURATION_PATH,
    DEFAULT_STATIC_FILES_DIR,
    DEFAULT_VIEWS_DIR,
    DEFAULT_WEBPACK_CONFIG_DIR,
    DEFAULT_WEBPACK_DEVELOPMENT_CONFIG_PATH,
    DEFAULT_HOST,
    DEFAULT_PORT,
    DEFAULT_MODEL_HOST,
    DEFAULT_ROUTER_PREFIX,
    EMPTY_ROUTE_CONFIGURATION,
    DEFAULT_SUPPORTED_METHODS,
    DEFAULT_ROUTING_REGEX_PREFIX,
    DEFAULT_ROUTING_REGEX_DELIMITER,
    DEFAULT_RELEASE_VERSION,
    RELEASE_TIMESTAMP,
    DEFAULT_SESSION_SECRET,
    DEFAULT_REDIS_HOST,
    DEFAULT_REDIS_PORT,
    DEFAULT_REDIS_IP_FAMILY,
    DEFAULT_REDIS_DB,
    DEFAULT_REDIS_TTL,
    DEFAULT_SESSION_COOKIE_LIFETIME,
    DEFAULT_CONTROLLER_METHOD_DELIMITER,
    DEFAULT_ROUTE_METHOD_DELIMITER,
    DEFAULT_ROUTE_CLEANUP_PATTERN,
    DEFAULT_ROUTE_CLEANUP_REPLACE,
    DEFAULT_HTTP_METHOD
} from '@/core/constants';
import Constants from '@/core/constants';
import Jade from 'jade';
import UUID from 'uuid';


export default (environment) => {
  let Logger = console;

  let config = {
    constants: Constants,
    paths: {
      base: BASE_DIR,
      models: DEFAULT_MODELS_DIR,
      controllers: DEFAULT_CONTROLLERS_DIR,
      services: DEFAULT_SERVICES_DIR,
      middlewares: DEFAULT_MIDDLEWARES_DIR,
      middlewaresBefore: DEFAULT_MIDDLEWARES_BEFORE_DIR,
      middlewaresAfter: DEFAULT_MIDDLEWARES_AFTER_DIR,
      config: DEFAULT_CONFIGURATION_DIR,
      mainConfig: DEFAULT_MAIN_CONFIGURATION_PATH,
      envConfig: DEFAULT_ENVIRONMENT_CONFIGURATION_PATH,
      localConfig: DEFAULT_LOCAL_CONFIGURATION_PATH,
      staticFilesPath: DEFAULT_STATIC_FILES_DIR,
      viewsPath: DEFAULT_VIEWS_DIR,
      webpackConfigPath: DEFAULT_WEBPACK_DEVELOPMENT_CONFIG_PATH
    },
    options: {
      release: {
        version: DEFAULT_RELEASE_VERSION,
        timestamp: RELEASE_TIMESTAMP
      },
      server: {
        environment,
        host: DEFAULT_HOST,
        port: DEFAULT_PORT
      },
      views: {
        engineName: 'jade',
        engine: Jade.__express,
        cached: false
      },
      session: {
        genid: () => {
          return UUID.v4();
        },
        name: 'sessionId',
        resave: false,
        saveUninitialized: false,
        cookie: {
          maxAge: DEFAULT_SESSION_COOKIE_LIFETIME,
          secure: false
        },
        redisOptions: {
          prefix: 'session:',
          host: DEFAULT_REDIS_HOST,
          port: DEFAULT_REDIS_PORT,
          ttl: DEFAULT_REDIS_TTL,
          clientOptions: {
            host: DEFAULT_REDIS_HOST,
            port: DEFAULT_REDIS_PORT,
            family: DEFAULT_REDIS_IP_FAMILY,
            db: DEFAULT_REDIS_DB
          }
        },
        secret: DEFAULT_SESSION_SECRET
      },
      logger: Logger,
      routing: {
        apiPrefix: DEFAULT_ROUTER_PREFIX,
        routes: EMPTY_ROUTE_CONFIGURATION,
        supportedMethods: DEFAULT_SUPPORTED_METHODS,
        regexPrefix: DEFAULT_ROUTING_REGEX_PREFIX,
        regexDelimiters: DEFAULT_ROUTING_REGEX_DELIMITER,
        controllerMethodDelimiter: DEFAULT_CONTROLLER_METHOD_DELIMITER,
        routeMethodDelimiter: DEFAULT_ROUTE_METHOD_DELIMITER,
        routeMethodCleanupPattern: DEFAULT_ROUTE_CLEANUP_PATTERN,
        routeMethodCleanupReplace: DEFAULT_ROUTE_CLEANUP_REPLACE,
        defaultHttpMethod: DEFAULT_HTTP_METHOD
      },
      middlewares: {
        before: [],
        after: []
      },
      services: {},
      models: {
        url: DEFAULT_MODEL_HOST,
        options: {}
      },
      webpack: {
        compiler: null,
        options: {}
      }
    }
  };

  Logger.log(`Default configuration found by path "${__filename}`);

  let mainConfig;
  let envConfig;
  let localConfig;

  try {
    mainConfig = require(config.paths.mainConfig);
    if (typeof mainConfig === 'function') {
      mainConfig = mainConfig(config);
    }
    Logger.info(`User-defined configuration has been found by the path "${config.paths.mainConfig}"...`);
  } catch (e) {
    Logger.info(`No user-defined configuration with the path "${config.paths.mainConfig}" found, skipping...`);
    Logger.error(e.stack);
    mainConfig = {};
  }

  try {
    envConfig = require(config.paths.envConfig);
    if (typeof envConfig === 'function') {
      envConfig = envConfig(config);
    }
    Logger.info(`Environment-based configuration has been found by the path "${config.paths.envConfig}"...`);
  } catch (e) {
    Logger.info(`No environment-based configuration with the path "${config.paths.envConfig}" found, skipping...`);
    Logger.error(e.stack);
    envConfig = {};
  }

  try {
    localConfig = require(config.paths.localConfig);
    if (typeof localConfig === 'function') {
      envConfig = localConfig(config);
    }
    Logger.info(`Local configuration has been found by the path "${config.paths.localConfig}"...`);
  } catch (e) {
    Logger.info(`No local configuration with the path "${config.paths.localConfig}" found, skipping...`);
    Logger.error(e.stack);
    localConfig = {};
  }

  return _.merge(
      {},
      config,
      {options: mainConfig},
      {options: envConfig},
      {options: localConfig});
};
