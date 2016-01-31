'use strict';


import Controller from '@/core/base/Controller';


export default class SessionController extends Controller {

  async signup(request, response) {
    response.send({signedUp: true});
  }


  async login(request, response) {
    request.session.authenticated = true;
    request.session.save((error) => {
      if (error) {
        throw new SessionException(error);
      } else {
        response.send({
          key: request.session.id,
          authenticated: request.session.authenticated
        });
      }
    });
  }


  async logout(request, response) {
    request.session.destroy((error) => {
      if (error) {
        throw new SessionException(error);
      } else {
        response.send({
          authenticated: false
        });
      }
    });
  }

}
