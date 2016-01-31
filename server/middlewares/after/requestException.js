'use strict';


import {DEFAULT_ERROR_HTTP_STATUS} from '@/core/constants';
import Environments from '@/core/enumerations/Environments';


export default (app) => {
  app.logger().info('Applying forced json response middleware...');

  return (error, request, response, next :Function) => {
    let e = error || {
      message: '[no message]',
      stack: '[no stack]',
      constructor: {
        name: 'UnknownException'
      }
    };

    app.logger().info('Exception thrown to response: ', e.message || e);
    app.logger().error(e.stack || e);

    let responseData = {
      status: 'error',
      details: e.message,
      type: e.constructor.name
    };

    if (app.environment() !== Environments.PRODUCTION) {
      responseData.trace = e.stack;
    }

    response
        .status(error.httpStatus || DEFAULT_ERROR_HTTP_STATUS)
        .sendJson(responseData);
  };
};
