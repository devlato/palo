'use strict';


import Service from '@/core/base/Service';
import UserNotFoundException from '@/exceptions/UserNotFoundException';
import _ from 'lodash';


class UserService extends Service {

  preConstruct(app) {
    this.autowired('User');
  }


  async findById(id :String) :Object {
    let user = await this.user.getById(id);

    if (_.isEmpty(user)) {
      throw new UserNotFoundException(id);
    }

    return user;
  }


  async findByPublisherId(publisherId, pager :Pager) :Object {
    let users = await this.user.getByPublisherId(publisherId, pager);

    if (_.isEmpty(users)) {
      return [];
    }

    return users;
  }


  async findByUsername(username :String) {
    let user = await this.user.getByUsername(username);

    if (_.isEmpty(user)) {
      throw new UserNotFoundException(username);
    }

    return user;
  }


  async findByUsernameAndPassword(username :String, password :String) {
    let user = await this.user.getByUsernameAndPassword(username, password);

    if (_.isEmpty(user)) {
      throw new UserNotFoundException(username);
    }

    return user;
  }


  async isUserExists(username :String) {
    try {
      return !!await this.findByUsername(username);
    } catch (e) {
      this.logger().info(`User "${username}" not found: `, e.message || '[no message]');
      this.logger().error(e.stack || '[no stack]');
      return false;
    }
  }


  async isUsernameAndPasswordPairCorrect(username :String, password :String) {
    try {
      return !!await this.findByUsernameAndPassword(username, password);
    } catch (e) {
      this.logger().info(`User "${username}" with given password not found: `, e.message || '[no message]');
      this.logger().error(e.stack || '[no stack]');
      return false;
    }
  }
}


export default UserService;
