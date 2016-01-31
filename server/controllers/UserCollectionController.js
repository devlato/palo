'use strict';


import Controller from '@/core/base/Controller';
import Pager from '@/core/components/Pager';


export default class UserCollectionController extends Controller {

  preConstruct() {
    this.autowired('UserService');
  }


  async getByQueryParams(request, response) {
    let publisherId = request.param('publisherId');
    let pager = Pager.fromRequest(request);
    let users = await this.userService.findByPublisherId(publisherId, pager);

    response.send(users);
  }
}
