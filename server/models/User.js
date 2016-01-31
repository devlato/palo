'use strict';


import Model from '@/core/base/Model';
import format from 'string-template';


class User extends Model {

  urls = {
    GET_BY_ID: '/user/{id}',
    GET_BY_PUBLISHER_ID: '/users',
    GET_BY_USERNAME_AND_PASSWORD: '/user/',
    GET_BY_USERNAME: '/user/'
  };


  async getById(id :String) :Object {
    return await this.remoteRequest(
        this.getUrl('GET_BY_ID', {id}),
        this.HttpMethods.GET);
  }


  async getByPublisherId(publisherId :String, pager :Pager) {
    return await this.remoteRequest(
        this.getUrl('GET_BY_PUBLISHER_ID'),
        this.HttpMethods.GET,
        _.merge({}, {publisherId}, pager.toQueryObject()));
  }


  async getByUsernameAndPassword(username :String, password :String) :Object {
    return await this.remoteRequest(
        this.getUrl('GET_BY_USERNAME_AND_PASSWORD'),
        this.HttpMethods.GET,
        {email: username, password});
  }


  async getByUsername(username :String) :Object {
    return await this.remoteRequest(
        this.getUrl('GET_BY_USERNAME'),
        this.HttpMethods.GET,
        {email: username});
  }


  getUrl(key :String, data = {}) {
    return format(this.urls[key], data);
  }

}


export default User;
