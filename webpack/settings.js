'use strict';


var Path = require('path');


exports.PROJECT_ROOT = Path.join(__dirname, '..');
exports.BASE_PATH = Path.join(exports.PROJECT_ROOT, './server');
exports.PATH_CONSTANTS_PATH = Path.join(exports.BASE_PATH, './core/constants/paths');


var Webpack = require('webpack');

var PostCssNext = require('postcss-cssnext');
var PostCssPreCss = require('precss');
var PostCssLost = require('lost');
var PostCssNano = require('cssnano');
var PostCssFontMagician = require('postcss-font-magician');
var PostCssImport = require('postcss-import');
var PostCssUse = require('postcss-use');

var Constants = require(exports.PATH_CONSTANTS_PATH);


exports.DEFAULT_ASSETS_DIR = Constants.DEFAULT_ASSETS_DIR;
exports.DEFAULT_CLIENT_APP_DIR = Constants.DEFAULT_CLIENT_APP_DIR;
exports.DEFAULT_CLIENT_APP_IMAGES_DIR = Constants.DEFAULT_CLIENT_APP_IMAGES_DIR;
exports.DEFAULT_CLIENT_APP_SPRITES_DIR = Constants.DEFAULT_CLIENT_APP_SPRITES_DIR;
exports.DEFAULT_CLIENT_APP_FONTS_DIR = Constants.DEFAULT_CLIENT_APP_FONTS_DIR;
exports.DEFAULT_CLIENT_APP_CSS_DIR = Constants.DEFAULT_CLIENT_APP_CSS_DIR;
exports.DEFAULT_CLIENT_APP_SCSS_DIR = Constants.DEFAULT_CLIENT_APP_SCSS_DIR;
exports.DEFAULT_CLIENT_APP_LESS_DIR = Constants.DEFAULT_CLIENT_APP_LESS_DIR;
exports.DEFAULT_CLIENT_APP_SCSS_SPRITES_DIR = Constants.DEFAULT_CLIENT_APP_SCSS_SPRITES_DIR;

exports.IMAGES_INCLUDE = [exports.DEFAULT_CLIENT_APP_IMAGES_DIR, exports.DEFAULT_CLIENT_APP_SPRITES_DIR];

exports.BABEL_LOADER = ['babel'];
exports.ESLINT_LOADER = ['eslint'];
exports.URL_LOADER = 'url';
exports.FILE_LOADER = 'file';
exports.JSON_LOADER = 'json';
exports.STYLE_LOADER = 'style';
exports.CSS_LOADER = 'css?module&localIdentName=[local]__[hash:base64:5]';
exports.POSTCSS_LOADER = 'postcss';
exports.RESOLVE_URL_LOADER = 'resolve-url';
exports.LESS_LOADER =
        'less?sourceMap&outputStyle=expanded' +
        '&includePaths[]=' + encodeURIComponent(exports.DEFAULT_CLIENT_APP_LESS_DIR) +
        '&includePaths[]=' + encodeURIComponent(exports.DEFAULT_CLIENT_APP_CSS_DIR);
exports.SCSS_LOADER =
        'sass?sourceMap&outputStyle=expanded' +
        '&includePaths[]=' + encodeURIComponent(exports.DEFAULT_CLIENT_APP_SCSS_DIR) +
        '&includePaths[]=' + encodeURIComponent(exports.DEFAULT_CLIENT_APP_CSS_DIR);

exports.IMAGES_LOADER = exports.URL_LOADER;
exports.WOFF_LOADER = exports.URL_LOADER + '?limit=10000&mimetype=application/font-woff';
exports.TTF_LOADER = exports.URL_LOADER + '?limit=10000&mimetype=application/octet-stream';
exports.EOT_LOADER = exports.FILE_LOADER;
exports.SVG_LOADER = 'svg-sprite?' + JSON.stringify({
    name: '[name]_[hash]',
    prefixize: true
});
exports.STYLE_CSS_LOADER = exports.STYLE_LOADER + '!' + exports.CSS_LOADER;
exports.CSS_PREPROCESSOR_LOADER_CLEAN = exports.STYLE_CSS_LOADER + '&importLoaders=1';
exports.CSS_PREPROCESSOR_LOADER = exports.CSS_PREPROCESSOR_LOADER_CLEAN + '&sourceMap';
exports.PREPROCESSOR_TO_CSS_LOADER = exports.CSS_PREPROCESSOR_LOADER + '!' +
    exports.POSTCSS_LOADER + '!' + exports.RESOLVE_URL_LOADER;
exports.LESS_TO_CSS_LOADER = exports.PREPROCESSOR_TO_CSS_LOADER + '!' + exports.LESS_LOADER;
exports.SCSS_TO_CSS_LOADER = exports.PREPROCESSOR_TO_CSS_LOADER + '!' + exports.SCSS_LOADER;

exports.POSTCSS_ALLOWED_MODULES = ['cssnext', 'precss', 'lost', 'font-magician', 'import', 'use'];

exports.RESOLVED_EXTENSIONS = ['', '.js', '.jsx', '.scss', '.css', '.less'];
exports.RESOLVED_MODULE_DIRECTORIES = ['app', 'node_modules'];

exports.SPRITE_STYLE_PROCESSOR = 'scss';
exports.SPRITE_STYLE_CLASS_PREFIX = 'icon';
exports.SPRITE_STYLE_FILE_NAME_PREFIX = 'sprites';
exports.SPRITE_IMAGE_FORMAT = 'png';
exports.SPRITE_BUNDLE_MODE = 'multiple';

exports.ES6_JS_FILES_PATTERN = /\.js$|\.jsx$/;
exports.JSON_FILES_PATTERN = /\.json$/;
exports.IMAGE_FILES_PATTERN = /\.(png|jpg)$/;
exports.SVG_IMAGE_FILES_PATTERN = /\.svg(\?v=\d+\.\d+\.\d+)?$/;
exports.WOFF_FONT_FILES_PATTERN = /\.woff(\?v=\d+\.\d+\.\d+)?$/;
exports.TTF_FONT_FILES_PATTERN = /\.ttf(\?v=\d+\.\d+\.\d+)?$/;
exports.EOT_FONT_FILES_PATTERN = /\.eot(\?v=\d+\.\d+\.\d+)?$/;
exports.CSS_FILES_PATTERN = /\.css$/;
exports.LESS_FILES_PATTERN = /\.less$/;
exports.SCSS_FILES_PATTERN = /\.scss$/;
exports.NODE_MODULES_DIR_PATTERN = /node_modules/;
exports.ASSETS_DIR_PATTERN = '/assets/';

exports.CLIENT_APP_ENTRY = './client';
exports.SERVER_APP_ENTRY = './server';
exports.CLIENT_APP_COMPILED_OUTPUT_FILE_PATTERN = '[name].js';
exports.SERVER_APP_COMPILED_OUTPUT_FILE_PATTERN = '[name].server.js';
exports.SERVER_APP_LIBRARY_TARGET_FORMAT = 'commonjs2';


var postCssImport = PostCssImport({addDependencyTo: Webpack});
var postCssUse = PostCssUse({
  modules: exports.POSTCSS_ALLOWED_MODULES
});


exports.POSTCSS_ENABLED_MODULES = [
  PostCssNext, PostCssPreCss, PostCssFontMagician,
  PostCssLost, PostCssNano, postCssImport, postCssUse];
