'use strict';


import _ from 'lodash';
import ComponentAutowireException from '@/core/exceptions/ComponentAutowireException';


class Component {

  constructor(app :App) :Component {
    this._app = app;

    this.preConstruct(app);

    return this;
  }


  preConstruct(app) {
    return this;
  }


  autowired() {
    let wire;

    if ((arguments.length === 1)
        && (_.isArray(arguments[0]) || _.isPlainObject(arguments[0]))) {
      wire = arguments[0];
    } else {
      wire = arguments;
    }

    this._autowire(wire);
  }


  _toLowerCamelCase(string) {
    return string.replace(/^[a-z]/i, (letter) => {
      return letter.toLowerCase();
    });
  }


  _autowire(items) {
    let logger = this.logger();
    logger.info(`Items to autowire found: [${_.values(items).join(', ')}]`);

    _.each(items, (item, key) => {
      let autoWiredName = key;
      if (_.isNumber(+autoWiredName)) {
        autoWiredName = this._toLowerCamelCase(item);
      }

      let instance = _.reduce(
          [this.getService(item), this.getModel(item), this.getController(item)],
          (memo, instance) => {
            if (!memo) {
              return instance;
            }

            return memo;
          }, null);

      if (!instance) {
        throw new ComponentAutowireException(item, autoWiredName, this.constructor.name);
      }

      this[autoWiredName] = instance;
      logger.info(`Autowired ${item} instance as ${this.constructor.name}.${autoWiredName}`);
    });
  }


  app() {
    return this._app;
  }


  config() {
    return this.app().config();
  }


  models() {
    return this.app().models();
  }


  controllers() {
    return this.app().controllers();
  }


  services() {
    return this.app().services();
  }


  middlewares() {
    return this.app().middlewares();
  }


  logger() {
    return this.app().logger();
  }


  getModel(modelId :String) {
    return this.models()[modelId];
  }


  getController(controllerId :String) {
    return this.controllers()[controllerId];
  }


  getService(serviceId :String) {
    return this.services()[serviceId];
  }


  getMiddleware(middlewareName :String) {
    return this.middlewares()[middlewareName];
  }


  log() {
    let logger = this.logger();

    return logger.log.apply(logger, arguments);
  }
}


export default Component;
