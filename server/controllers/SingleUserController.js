'use strict';


import Controller from '@/core/base/Controller';


export default class SingleUserController extends Controller {

  preConstruct() {
    this.autowired('UserService');
  }


  async getById(request, response) {
    let id = request.params.id;
    let user = await this.userService.findById(id);

    response.send(user);
  }


  async getByQueryParams(request, response) {
    let username = request.query.username;
    let user = await this.userService.findByUsername(username);

    response.send(user);
  }


  async isUserExists(request, response) {
    let username = request.query.username;
    let password = request.query.password;
    let isExists = await this.userService.isUsernameAndPasswordPairCorrect(username, password);

    response.send({
      exists: isExists
    });
  }
}
