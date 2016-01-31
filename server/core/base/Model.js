'use strict';


import _ from 'lodash';
import Component from '@/core/base/Component';
import Pager from '@/core/components/Pager';
// import Uri from 'urijs';
import RemoteRequest from '@/core/components/RemoteRequest';
import HttpMethods from '@/core/enumerations/HttpMethods';


class Model extends Component {

  constructor(app :App) :Model {
    super(app);

    return this;
  }


  _newRequest() :RemoteRequest {
    let config = this.config().options.models;
    return new RemoteRequest(config.url, config.options, this.logger());
  }


  request() :RemoteRequest {
    if (!this._request) {
      this._request = this._newRequest();
    }

    return this._request;
  }


  async remoteRequest(
      apiMethod :String,
      httpMethod :String = HttpMethods.GET,
      data :Object = {},
      options :Object = {}
  ) :Object {
    let request = this.request();

    if (data instanceof Pager) {
      data = data.toQueryObject();
    }

    try {
      let result = await request.doRequest(apiMethod, httpMethod, data, options);
      return JSON.parse(result);
    } catch (e) {
      this.logger().info('Error while performing request to remote API: ', e.message || '[no message]');
      this.logger().error(e.stack || '[no stack]');
      return null;
    }
  }


  getUrl(key :String, data = {}) {
    return null;
  }
}


Model.prototype.HttpMethods = HttpMethods;


export default Model;
