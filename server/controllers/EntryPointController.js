'use strict';


import Controller from '@/core/base/Controller';


export default class EntryPointController extends Controller {

  async getEntryPoint(request, response) {
    let releaseTimestamp = this.config().options.release.timestamp;
    let initialState = {
      user: {
        isWaiting: false,
        key: request.session.id,
        authenticated: request.session.authenticated
      }
    };

    response.render('index', {
      app: this.app(),
      request,
      initialState,
      releaseTimestamp
    });
  }

}
