'use strict';


import _ from 'lodash';
import Session from 'express-session';
import Redis from 'ioredis';
import RedisStore from 'connect-redis';


export default {
  register: function(app) {
    app.logger().info('Applying session middleware...');

    let SessionRedisStore = RedisStore(Session);

    let config = app.config().options.session;
    let sessionOptions = _.omit(config, ['redisOptions']);
    let storeOptions = _.omit(config.redisOptions, ['clientOptions']);
    let redisOptions = config.redisOptions.clientOptions;

    let redis = new Redis(redisOptions);
    let redisStore = new SessionRedisStore(_.merge({}, {
      client: redis
    }, storeOptions));
    let options = _.merge({}, {
      store: redisStore
    }, sessionOptions);

    let session = Session(options);

    app.server().use(session);

    return app.server().use((request, response, next :Function) => {
      app.logger().info(`Request with session id "${request.session.id}"`);
      next();
    });
  }
};
