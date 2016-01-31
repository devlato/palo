'use strict';


import Express from 'express';


export default {
  register: function(app) {
    app.logger().info('Applying static files serving middleware...');

    return app.server().use(Express.static(app.config().paths.staticFilesPath));
  }
};
