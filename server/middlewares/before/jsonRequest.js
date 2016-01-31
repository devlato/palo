'use strict';


export default (app) => {
  app.logger().info('Applying forced json response middleware...');

  return (request, response, next :Function) => {

    response.asRendered = function() {
      response._asRendered = true;
      return response;
    };


    response.sendingAsRendered = function() {
      return response._asRendered;
    };


    response.cleanRender = function() {
      response.asRendered();
      return response.pureRender.apply(response, arguments);
    };


    response.sendJson = function(data) {
      if (!response.sendingAsRendered()) {
        try {
          app.logger().info('Converting response to JSON...');
          return response.pureSend(JSON.stringify(data));
        } catch (e) {
          app.logger().info('Error occurred while trying to send response: ', e.message || '[no message]');
          app.logger().error(e.stack);
          return response.pureSend({
            status:  'error',
            details: e.message,
            trace:   e.stack
          });
        }
      } else {
        app.logger().info('Sending rendered view...');
        return response.pureSend(data);
      }
    };


    response.send = response.sendJson;
    response.render = response.cleanRender;


    next();
  };
};
