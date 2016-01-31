'use strict';


var _ = require('lodash');
var Path = require('path');


exports.PROJECT_ROOT = Path.resolve(__dirname, '../../../');
exports.BASE_DIR = Path.resolve(exports.PROJECT_ROOT, './server');

exports.DEFAULT_CONFIG_PATH = Path.resolve(exports.BASE_DIR, './core/skeleton-config');
exports.DEFAULT_ENVIRONMENT = process.env.NODE_ENV || 'development';

exports.DEFAULT_MODELS_DIR = Path.resolve(exports.BASE_DIR, './models');
exports.DEFAULT_CONTROLLERS_DIR = Path.resolve(exports.BASE_DIR, './controllers');
exports.DEFAULT_SERVICES_DIR = Path.resolve(exports.BASE_DIR, './services');
exports.DEFAULT_MIDDLEWARES_DIR = Path.resolve(exports.BASE_DIR, './middlewares');
exports.DEFAULT_MIDDLEWARES_BEFORE_DIR = Path.resolve(exports.DEFAULT_MIDDLEWARES_DIR, './before');
exports.DEFAULT_MIDDLEWARES_AFTER_DIR = Path.resolve(exports.DEFAULT_MIDDLEWARES_DIR, './after');

exports.DEFAULT_CLIENT_APP_DIR = Path.resolve(exports.PROJECT_ROOT, './app');
exports.DEFAULT_CLIENT_ENTRY_POINT_PATH = Path.resolve(exports.DEFAULT_CLIENT_APP_DIR, './client');
exports.DEFAULT_CLIENT_APP_IMAGES_DIR = Path.resolve(exports.DEFAULT_CLIENT_APP_DIR, './images');
exports.DEFAULT_CLIENT_APP_SPRITES_DIR = Path.resolve(exports.DEFAULT_CLIENT_APP_DIR, './sprites');
exports.DEFAULT_CLIENT_APP_FONTS_DIR = Path.resolve(exports.DEFAULT_CLIENT_APP_DIR, './fonts');
exports.DEFAULT_CLIENT_APP_SCSS_DIR = Path.resolve(exports.DEFAULT_CLIENT_APP_DIR, './scss');
exports.DEFAULT_CLIENT_APP_CSS_DIR = Path.resolve(exports.DEFAULT_CLIENT_APP_DIR, './css');
exports.DEFAULT_CLIENT_APP_LESS_DIR = Path.resolve(exports.DEFAULT_CLIENT_APP_DIR, './less');
exports.DEFAULT_CLIENT_APP_SCSS_SPRITES_DIR = Path.resolve(exports.DEFAULT_CLIENT_APP_SCSS_DIR, './sprites');

exports.DEFAULT_CONFIGURATION_DIR = Path.resolve(exports.BASE_DIR, './configuration');
exports.DEFAULT_MAIN_CONFIGURATION_PATH = Path.resolve(exports.DEFAULT_CONFIGURATION_DIR, './config');
exports.DEFAULT_ENVIRONMENT_CONFIGURATION_PATH = Path.resolve(exports.DEFAULT_CONFIGURATION_DIR, './' + exports.DEFAULT_ENVIRONMENT);
exports.DEFAULT_LOCAL_CONFIGURATION_PATH = Path.resolve(exports.DEFAULT_CONFIGURATION_DIR, './local');

exports.DEFAULT_STATIC_FILES_DIR = Path.resolve(exports.PROJECT_ROOT, './public');
exports.DEFAULT_ASSETS_DIR = Path.resolve(exports.DEFAULT_STATIC_FILES_DIR, './assets');
exports.DEFAULT_VIEWS_DIR = Path.resolve(exports.BASE_DIR, './views');

exports.DEFAULT_WEBPACK_CONFIG_DIR = Path.resolve(exports.PROJECT_ROOT, './webpack');
exports.DEFAULT_WEBPACK_DEVELOPMENT_CONFIG_PATH = Path.resolve(exports.DEFAULT_WEBPACK_CONFIG_DIR, './webpack.config.' + exports.DEFAULT_ENVIRONMENT);
