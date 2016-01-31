'use strict';


var Webpack = require('webpack');
var WebpackSpritePlugin = require('sprite-webpack-plugin');
var WebpackExtractTextPlugin = require('extract-text-webpack-plugin');


var Settings = require('./settings');

var PNG_FILES_PATTERN = /\.png$/;
var JPG_FILES_PATTERN = /\.jpg$/;

var URL_IMAGE_LOADER = Settings.URL_LOADER + '?limit=10000';
var PNG_LOADER = URL_IMAGE_LOADER + '&mimetype=image/png';
var JPG_LOADER = URL_IMAGE_LOADER + '&mimetype=image/jpeg';


var CSS_LOADER = Settings.CSS_LOADER + '&importLoaders=1';
var PREPROCESSOR_TO_CSS_LOADER = CSS_LOADER + '!' + Settings.POSTCSS_LOADER + '!' +
    Settings.RESOLVE_URL_LOADER;
var LESS_TO_CSS_LOADER = PREPROCESSOR_TO_CSS_LOADER + '!' + Settings.LESS_LOADER;
var SCSS_TO_CSS_LOADER = PREPROCESSOR_TO_CSS_LOADER + '!' + Settings.SCSS_LOADER;

var CLIENT_COMPILATION_DEVTOOL = 'source-map';
var CLIENT_OUTPUT_STYLES_NAME = 'styles/main.css';

var WEBPACK_ENABLED_PLUGINS = [
  new Webpack.optimize.OccurenceOrderPlugin(),
  new WebpackExtractTextPlugin(CLIENT_OUTPUT_STYLES_NAME),
  new Webpack.optimize.UglifyJsPlugin({
    compressor: {
      warnings: false
      }
    }
  ),
  new WebpackSpritePlugin({
    source: Settings.DEFAULT_CLIENT_APP_IMAGES_DIR,
    imgPath: Settings.DEFAULT_CLIENT_APP_SPRITES_DIR,
    cssPath: Settings.DEFAULT_CLIENT_APP_SCSS_SPRITES_DIR,
    format: Settings.SPRITE_IMAGE_FORMAT,
    prefix: Settings.SPRITE_STYLE_CLASS_PREFIX,
    spriteName: Settings.SPRITE_STYLE_FILE_NAME_PREFIX,
    processor: Settings.SPRITE_STYLE_PROCESSOR,
    bundleMode: Settings.SPRITE_BUNDLE_MODE,
    useImport: true
  })
];


var commonLoaders = [{
  test: Settings.ES6_JS_FILES_PATTERN,
  loaders: Settings.BABEL_LOADER,
  include: Settings.DEFAULT_CLIENT_APP_DIR,
  exclude: Settings.NODE_MODULES_DIR_PATTERN
}, {
  test: Settings.JSON_FILES_PATTERN,
  loader: Settings.JSON_LOADER
}, {
  test: PNG_FILES_PATTERN,
  include: Settings.IMAGES_INCLUDE,
  loader: PNG_LOADER
}, {
  test: JPG_FILES_PATTERN,
  include: Settings.IMAGES_INCLUDE,
  loader: JPG_LOADER
}, {
  test: Settings.SCSS_FILES_PATTERN,
  include: Settings.DEFAULT_CLIENT_APP_SCSS_DIR,
  loader: WebpackExtractTextPlugin.extract(Settings.STYLE_LOADER, SCSS_TO_CSS_LOADER)
}, {
  test: Settings.LESS_FILES_PATTERN,
  include: Settings.DEFAULT_CLIENT_APP_LESS_DIR,
  loader: WebpackExtractTextPlugin.extract(Settings.STYLE_LOADER, LESS_TO_CSS_LOADER)
}, {
  test: Settings.WOFF_FONT_FILES_PATTERN,
  include: Settings.DEFAULT_CLIENT_APP_FONTS_DIR,
  loader: Settings.WOFF_LOADER
}, {
  test: Settings.TTF_FONT_FILES_PATTERN,
  include: Settings.DEFAULT_CLIENT_APP_FONTS_DIR,
  loader: Settings.TTF_LOADER
}, {
  test: Settings.EOT_FONT_FILES_PATTERN,
  include: Settings.DEFAULT_CLIENT_APP_FONTS_DIR,
  loader: Settings.EOT_LOADER
}, {
  test: Settings.SVG_IMAGE_FILES_PATTERN,
  include: Settings.IMAGES_INCLUDE,
  loader: Settings.SVG_LOADER
}];


module.exports = [{
  name: 'Client-Side Bundle',
  devtool: CLIENT_COMPILATION_DEVTOOL,
  context: Settings.DEFAULT_CLIENT_APP_DIR,
  entry: {
    app: Settings.CLIENT_APP_ENTRY
  },
  output: {
    path: Settings.DEFAULT_ASSETS_DIR,
    filename: Settings.CLIENT_APP_COMPILED_OUTPUT_FILE_PATTERN,
    publicPath: Settings.ASSETS_DIR_PATTERN
  },
  module: {
    preLoaders: [{
      test: Settings.ES6_JS_FILES_PATTERN,
      exclude: Settings.NODE_MODULES_DIR_PATTERN,
      loaders: Settings.ESLINT_LOADER
    }],
    loaders: commonLoaders
  },
  resolve: {
    extensions: Settings.RESOLVED_EXTENSIONS,
    modulesDirectories: Settings.RESOLVED_MODULE_DIRECTORIES
  },
  plugins: WEBPACK_ENABLED_PLUGINS
}, {
  name: 'Server-Side Rendering',
  context: Settings.DEFAULT_CLIENT_APP_DIR,
  entry: {
    app: Settings.SERVER_APP_ENTRY
  },
  target: 'node',
  output: {
    path: Settings.DEFAULT_ASSETS_DIR,
    filename: Settings.SERVER_APP_COMPILED_OUTPUT_FILE_PATTERN,
    publicPath: Settings.ASSETS_DIR_PATTERN,
    libraryTarget: Settings.SERVER_APP_LIBRARY_TARGET_FORMAT
  },
  module: {
    loaders: commonLoaders
  },
  postcss: Settings.POSTCSS_ENABLED_MODULES,
  resolve: {
    extensions: Settings.RESOLVED_EXTENSIONS,
    modulesDirectories: Settings.RESOLVED_MODULE_DIRECTORIES
  },
  plugins: WEBPACK_ENABLED_PLUGINS
}];
