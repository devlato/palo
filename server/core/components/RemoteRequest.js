'use strict';


import _ from 'lodash';
import Request from 'najax';
import HttpMethods from '@/core/enumerations/HttpMethods';


class RemoteRequest {

  constructor(url, options = {}, logger) {
    this.options = options;
    this.options.url = url;
    this._logger = logger;
  }


  logger() {
    return this._logger;
  }


  async doRequest(subUrl, httpMethod = HttpMethods.GET, data = {}, options = {}) {
    let requestOptions = _.merge({}, this.options, options);

    requestOptions.url = `${requestOptions.url}${subUrl}`;
    requestOptions.data = data;
    requestOptions.method = httpMethod;

    this.logger().info(
        `Performing request to remote repository "${requestOptions.url}" ` +
        "with parameters ", JSON.stringify(requestOptions));

    return await Request(requestOptions);
  }

}


export default RemoteRequest;
