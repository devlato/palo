'use strict';


import _ from 'lodash';
import Passport from 'passport';


export default {
  register: function(app) {
    app.logger().info('Applying passport middleware...');

    app.server().use(Passport.initialize());

    return app.server().use(Passport.session());
  }
};
