'use strict';


import Path from 'path';
import Model from '@/core/base/Model';
import Controller from '@/core/base/Controller';
import Service from '@/core/base/Service';
import Express from 'express';
import _ from 'lodash';
import AutoLoader from 'auto-loader';
import {
    DEFAULT_CONFIG_PATH,
    DEFAULT_ENVIRONMENT,
    DEFAULT_HOST,
    DEFAULT_PORT,
    EMPTY_ROUTING_PREFIX,
    EMPTY_REGEX_DELIMITERS
} from '@/core/constants';
import ServerParameters from '@/core/enumerations/ServerParameters';


export default class App {

  constructor(
      configPath :String = DEFAULT_CONFIG_PATH,
      environment :String = DEFAULT_ENVIRONMENT
  ) :App {
    this._setConfiguration(configPath, environment);
    this._init();

    return this;
  }


  _setConfiguration(configPath :String, environment :String) :App {
    this._config = require(configPath)(environment);

    return this;
  }


  _init() :App {
    this.server();

    this._initServer();
    this._setBeforeMiddlewares();
    this._setModels();
    this._setServices();
    this._setControllers();
    this._setRenderEngine();
    this._bind();
    this._setAfterMiddlewares();

    return this;
  }


  _newServer() :Express {
    this.logger().info('Creating new Express server instance...');

    let server = Express();
    server._startTime = new Date();

    return server;
  }


  config() :Object {
    return this._config;
  }


  server() :Express {
    if (!this._server) {
      this._server = this._newServer();
    }

    return this._server;
  }


  router() :Router {
    return server().router();
  }


  _initServer() :App {
    this.logger().info('Initializing server...');
    //this.server()(ServerParameters.PORT, this.config().options.port);

    return this;
  }


  _setBeforeMiddlewares() :App {
    this.logger().info('Setting middlewares to call before request...');
    this.logger().info('Enabled middlewares to execute before request are ' +
        `[${_.values(this.config().options.middlewares.before).join(', ')}]`);
    _.each(
        this.config().options.middlewares.before,
        (middlewareName) => this._addMiddleware(middlewareName, true));

    return this;
  }


  _setAfterMiddlewares() :App {
    this.logger().info('Setting middlewares to call after request...');
    this.logger().info('Enabled middlewares to execute after request are ' +
        `[${_.values(this.config().options.middlewares.after).join(', ')}]`);
    _.each(
        this.config().options.middlewares.after,
        (middlewareName) => this._addMiddleware(middlewareName, false));

    return this;
  }


  _addMiddleware = (middlewareName :String, isBeforeRequest :Boolean) :App => {
    this.logger().info(`Adding middleware ${middlewareName}...`);

    let basePath = isBeforeRequest
        ? this.config().paths.middlewaresBefore
        : this.config().paths.middlewaresAfter;
    let path = Path.resolve(basePath, middlewareName);
    let middleware = require(path);
    let server = this.server();
    server._middlewares = {};

    this.logger().info(`Middleware ${middlewareName} loaded, attaching...`);

    if (_.isFunction(middleware.register)) {
      this.logger().info(`Trying to attach middleware ${middlewareName} with .register() method`);
      middleware.register(this);
      server._middlewares[middlewareName] = middleware.register;
    } else if (middleware.length === 3) {
      this.logger().info(`Trying to attach middleware ${middlewareName} via .use() method`);
      server.use(middleware);
      server._middlewares[middlewareName] = middleware;
    } else if (middleware.length === 1) {
      this.logger().info(`Trying to attach parametrized middleware ${middlewareName} via .use() method`);
      server.use(middleware(this));
      server._middlewares[middlewareName] = middleware;
    }

    return this;
  };


  _setRenderEngine() :App {
    this.logger().info('Setting view engine...');

    let config = this.config();
    let options = config.options.views;
    let server = this.server();

    this.logger().info(`Adding "${options.engineName}" as view engine option...`);
    server.set(ServerParameters.VIEW_ENGINE, options.engineName);

    this.logger().info(`Setting "${config.paths.viewsPath}" as home folder for views...`);
    server.set(ServerParameters.VIEWS_DIR, config.paths.viewsPath);

    this.logger().info(`${options.cached ? 'Enabling' : 'Disabling'} view caching...`);
    server.set(ServerParameters.VIEW_CACHE, options.cached);

    this.logger().info(`Setting "${options.engineName}" as default view engine...`);
    server.engine(options.engineName, options.engine);

    return this;
  }


  _setModels() :App {
    this.logger().info('Setting models...');
    let models = AutoLoader.load(this.config().paths.models);

    this.logger().info('Creating model instances...');
    this.server()._models = _.reduce(
        models,
        (memo, ModelClass, key :String) => {
          if (this._isModel(ModelClass)) {
            memo[key] = new ModelClass(this);
            this.logger().info(`${ModelClass.name} model has been attached successfully`);
          }

          return memo;
        }, {});

    return this;
  }


  _isModel(ModelClass :Model.constructor) :Boolean {
    let isModel = ModelClass instanceof Model.constructor;

    if (isModel) {
      this.logger().info(`Model ${ModelClass.name} has been found`);
    }

    return isModel;
  }


  _setControllers() :App {
    this.logger().info('Setting controllers...');
    let controllers = AutoLoader.load(this.config().paths.controllers);

    this.logger().info('Creating controller instances...');
    this.server()._controllers = _.reduce(
        controllers,
        (memo, ControllerClass, key :String) => {
          if (this._isController(ControllerClass)) {
            memo[key] = new ControllerClass(this);
            this.logger().info(`${ControllerClass.name} controller has been attached successfully`);
          }

          return memo;
        }, {});

    return this;
  }


  _isController(ControllerClass :Controller.constructor) :Boolean {
    let isController = ControllerClass instanceof Controller.constructor;

    if (isController) {
      this.logger().info(`Controller ${ControllerClass.name} has been found`);
    }

    return isController;
  }


  _setServices() :App {
    this.logger().info('Setting services...');
    let services = AutoLoader.load(this.config().paths.services);

    this.logger().info('Creating service instances...');
    this.server()._services = _.reduce(
        services,
        (memo, ServiceClass, key :String) => {
          if (this._isService(ServiceClass)) {
            memo[key] = new ServiceClass(this);
            this.logger().info(`${ServiceClass.name} service has been attached successfully`);
          }

          return memo;
        }, {});

    return this;
  }


  _isService(ServiceClass :Service.constructor) :Boolean {
    let isService = ServiceClass instanceof Service.constructor;

    if (isService) {
      this.logger().info(`Service ${ServiceClass.name} has been found`);
    }

    return isService;
  }


  environment() :String {
    return this.config().options.server.environment;
  }


  models() : Object<String, Model> {
    return this.server()._models || {};
  }


  controllers() :Object<String, Controller> {
    return this.server()._controllers || {};
  }


  services() :Object<String, Service> {
    return this.server()._services || {};
  }


  middlewares() :Object<String, Middleware> {
    return this.server()._middlewares || {};
  }


  logger() {
    return this.config().options.logger;
  }


  _bind() :App {
    this._bindControllers();
  }


  _bindControllers() :App {
    this.logger().info('Binding server for usage...');
    let routing = this.config().options.routing;
    let controllers = this.controllers();
    let supportedMethods = this.config().options.routing.supportedMethods;

    this.logger().info('Setting routes...');
    _.each(
        routing.routes,
        (controllerMethodJoined, routeMethodJoined) => {
          let {controllerId, controllerMethod} = this._extractControllerMethod(controllerMethodJoined);
          let {route, httpMethod} = this._extractRouteMethod(routeMethodJoined);
          if (supportedMethods.indexOf(httpMethod) === -1) {
            this.logger().info(`${httpMethod} Method is not supported, skipping binding...`);
            return false;
          }
          this._bindControllerSafely(controllers[controllerId], controllerMethod,
              route, httpMethod)
        });

    return this;
  }


  _extractControllerMethod(controllerMethodJoined :String) {
    this.logger().info(`Extracting target controller name and method from ${controllerMethodJoined}...`);
    let [controllerId, controllerMethod] = _.filter(
        _.map(
            controllerMethodJoined.split(this.config().options.routing.controllerMethodDelimiter),
            (item) => {
              return item.trim()
            }),
        (item) => !_.isEmpty(item));

    this.logger().info(`Extracted controller name "${controllerId}" and method name "${controllerMethod}"`);

    return {controllerId, controllerMethod};
  }


  _extractRouteMethod(routeMethodJoined :String) {
    this.logger().info(`Extracting target route name HTTP method from ${routeMethodJoined}...`);
    let config = this.config().options.routing;
    let result = _.filter(
        _.map(
            routeMethodJoined.split(config.routeMethodDelimiter),
            (item) => {
              return item.trim().replace(
                  config.routeMethodCleanupPattern,
                  config.routeMethodCleanupReplace);
            }),
        (item) => !_.isEmpty(item));

    if (result.length == 1) {
      result = [config.defaultHttpMethod].concat(result);
    }

    let [httpMethod, route] = result;

    httpMethod = httpMethod.toUpperCase();

    this.logger().info(`Extracted route "${route}" and HTTP method "${httpMethod}"`);

    return {route, httpMethod};
  }


  _bindControllerSafely(
      controllerInstance :Controller,
      controllerMethod :String,
      route :String,
      httpMethod :String
  ) :App {
    this.logger().info(`Binding route handler for ${route} route...`);
    let server = this.server();
    let routeToBind = route;

    if (this._isRegexRoute(routeToBind)) {
      this.logger().info(`Route "${routeToBind}" is a regular expression, converting...`);
      routeToBind = this._getRegexRoute(routeToBind);
      this.logger().info(`Route "${route}" has been converted to RegExp instance ("${routeToBind}")`);
    }

    this.logger().info(
        `Binding ${controllerInstance.constructor.name}.${controllerMethod} ` +
        `route handler for ${route} route and ${httpMethod} method...`);
    server[httpMethod.toLowerCase()](routeToBind,
        this._getRequestHandler(controllerInstance, controllerMethod));

    return this;
  }


  _getRegexRoute(route :String) {
    let config = this.config().options.routing;
    let cleanRoute = route
      .replace(config.regexPrefix, EMPTY_ROUTING_PREFIX)
      .replace(config.regexDelimiters, EMPTY_REGEX_DELIMITERS);

    return new RegExp(cleanRoute, 'ig');
  }


  _isRegexRoute(route :String) {
    return route.startsWith(this.config().options.routing.regexPrefix);
  }


  _getRequestHandler(controllerInstance :Controller, method :String) :Function {
    let logger = this.logger();

    logger.info(`Getting controller method safe proxy for ${method} method...`);
    return _.bind(async (request, response, next) => {
      try {
        logger.info(`Processing request to uri "${request.url}"...`);
        return await controllerInstance[method](request, response);
      } catch (e) {
        logger.info('Exception while processing request occurred: ', e.message || '[no error message]');
        logger.error(e.stack);
        next(e);
      }
    }, controllerInstance);
  }


  uptime() {
    return new Date() - this.server()._startTime;
  }


  run() :App {
    let config = this.config().options.server;
    let host = config.host || DEFAULT_HOST;
    let port = config.port || DEFAULT_PORT;

    this.logger().info(`Starting app on http://${host}:${port}/...`);

    //this._bind();
    this.logger().info('Server handlers has been successfully bound');
    this.server().listen(port, host);
    this.logger().log(`Server has been started successfully at http://${host}:${port}/`);
    this.logger().log(`Start elapsed ${this.uptime()}ms`);

    return this;
  }
}
