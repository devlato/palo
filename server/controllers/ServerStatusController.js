'use strict';


import Controller from '@/core/base/Controller';


export default class ServerStatusController extends Controller {

  async uptime(request, response) {
    response.send({
      uptime: this.app().uptime(),
      release: this.config().options.release
    });
  }

}
