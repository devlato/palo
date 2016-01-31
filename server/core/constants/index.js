'use strict';


import _ from 'lodash';
import Path from 'path';
import PagerSortDirections from '@/core/enumerations/PagerSortDirections';
import Environments from '@/core/enumerations/Environments';
import HttpMethods from '@/core/enumerations/HttpMethods';

import Constants from './paths';


_.each(Constants, (value, key) => {
  module.exports[key] = value;
});


export const DEFAULT_ENVIRONMENT :String = process.env.NODE_ENV || Environments.DEVELOPMENT;

export const DEFAULT_WEBPACK_DEV_SERVER_PORT :Number = 3000;
export const DEFAULT_WEBPACK_HOT_MIDDLEWARE_SCRIPT :String =
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';

export const DEFAULT_HOST :String = 'localhost';
export const DEFAULT_PORT :Number = 3000;

export const DEFAULT_ROUTER_PREFIX :String = '/';
export const DEFAULT_SUPPORTED_METHODS :Array<String> = _.values(HttpMethods);
export const EMPTY_ROUTE_CONFIGURATION :Object = {};
export const EMPTY_ROUTING_PREFIX: String = '';
export const DEFAULT_ROUTING_REGEX_PREFIX: String = 'regex:';
export const EMPTY_REGEX_DELIMITERS: String = '';
export const DEFAULT_ROUTING_REGEX_DELIMITER: RegExp = /(^\/|\/$)/ig;
export const DEFAULT_ROUTE_METHOD_DELIMITER: RegExp = /(\s|\t)/ig;
export const DEFAULT_ROUTE_CLEANUP_PATTERN: RegExp = /(^\[|\]$)/ig;
export const DEFAULT_ROUTE_CLEANUP_REPLACE: String = '';
export const DEFAULT_HTTP_METHOD: String = HttpMethods.GET;
export const DEFAULT_CONTROLLER_METHOD_DELIMITER: String = '.';

export const DEFAULT_MODEL_HOST :String = 'localhost';

export const DEFAULT_PAGE :Number = 0;
export const DEFAULT_ITEMS_PER_PAGE_AMOUNT :Number = 20;
export const DEFAULT_SORT_DIRECTION :String = PagerSortDirections.ASC;
export const DEFAULT_SORT_FIELDS :Array<String> = ['id'];

export const DEFAULT_RELEASE_VERSION: String = 'latest';
export const RELEASE_TIMESTAMP: Number = new Date().getTime();

export const DEFAULT_SESSION_SECRET: String = 'verysecretkey';
export const DEFAULT_SESSION_COOKIE_LIFETIME: Number = 86400000;

export const DEFAULT_REDIS_HOST: String = '127.0.0.1';
export const DEFAULT_REDIS_PORT: Number = 6379;
export const DEFAULT_REDIS_IP_FAMILY: Number = 4;
export const DEFAULT_REDIS_DB: Number = 0;
export const DEFAULT_REDIS_TTL: Number = 250;

export const DEFAULT_ERROR_HTTP_STATUS: Number = 400;
export const HTTP_STATUS_NOT_FOUND: Number = 404;
