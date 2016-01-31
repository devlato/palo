# Palo -- ES6-powered Express + React + Webpack + Jade

All modern technologies in one bundle: 
ECMAScript 6/7 via Babel + Express 4 + React + Webpack + FlightPlan + SASS + Redux + Jade

To run in dev mode, type ```npm run dev``` or ```pm2 start pm2.local.json``` to run in watch mode.
To build project, type ```npm run build```.

## Installation

1. Global dependencies: 
```
npm i -g \
    babel@6.3.26 \
    babel-cli@6.3.17 \
    gulp@3.9.0 \
    bower@1.7.1 \
    expect@1.13.4 \
    flightplan@0.6.8 \
    karma@0.13.15 \
    karma-jsdom-launcher@1.0.1 \
    karma-mocha@0.2.1 \
    karma-mocha-reporter@1.1.3 \
    karma-sourcemap-loader@0.3.6 \
    karma-webpack@1.7.0 \
    kexec@2.0.2 \
    mocha@2.3.4 \
    nock@3.6.0 \
    node-sass@3.4.2 \
    pm2@0.15.10 \
    rimraf@2.4.4 \
    react-addons-test-utils@0.14.3 \
    redux-mock-store@0.0.3 \
    webpack-dev-server@1.14.0
```

2. Dependencies
```
npm i
```

## Features

1. ES6 + ES2015 via Babel + ESlint
2. React + helmet
3. SASS and LESS support
4. Autobuild all with Webpack
5. Automated deploy
6. PM2 support
7. Redux
8. Jade support from-the-box
9. Sprite build from images directory
10. Remote repository data fetch and Model+Service architectute, so you can attach any another ORM like Sequelize
11. Comfortable project structure: 
```
├── app
│   ├── actions
│   │   ├── ...
│   │   └── // actions with redux
│   ├── client.jsx                         // client-side entry point
│   ├── components
│   │   ├── common                         // common react components
│   │   │   ├── authenticateComponent.jsx  // predefined component wrapper to check authentication status
│   │   │   ├── ...
│   │   │   └── // other common components
│   │   ├── components                     // compoments like buttons etc.
│   │   │   ├── ...
│   │   │   └──  // included component wrapper to check authentication status
│   │   └── pages
│   │       ├── ...
│   │       └── // page components which can be included as sub-components of routes in routes.jsx
│   ├── constants
│   │   ├── ...
│   │   ├── actionTypes.js                 // predefined action types for redux
│   │   └── // other constants
│   ├── createDevToolsWindow.js            // script to show devtools with stack traces etc.
│   ├── elements
│   │   ├── ...
│   │   ├── Header.jsx                     // predefined script to render html head properly with helmet etc.
│   │   └── // other constants
│   ├── helmconfig.js                      // helmet config
│   ├── images
│   │   ├── favicon.png                    // base favicon
│   │   └── favicons
│   │       ├── apple-icon-152x152.png     // apple touch icon
│   │       ├── chrome-icon-192x192.png    // chrome icon
│   │       ├── favicon-16x16.png          // basic favicon
│   │       ├── ms-icon-144x144.png        // msie icon
│   │       ├── ...
│   │       └── // page components which can be included as sub-components of routes in routes.jsx
│   ├── reducers
│   │   ├── ...
│   │   ├── index.js                       // reducer loader
│   │   └── user.js                        // predefined user reducer
│   │   └── // other reducers
│   ├── routes.jsx                         // client-side router configuration
│   ├── scss                               // preferred SCSS structure is similar to components dir structure
│   │   ├── common
│   │   │   ├── helpers.scss
│   │   │   ├── main.scss
│   │   │   ├── mixins.scss
│   │   │   └── settings.scss
│   │   ├── components
│   │   │   ├── _layout.scss
│   │   │   ├── _login.scss
│   │   │   └── _logout.scss
│   │   ├── pages
│   │   │   └── _profile.scss
│   │   └── sprites
│   │       ├── ...
│   │       └── // generated sprite styles
│   ├── server.jsx                         // entry point to server-side rendeting script
│   ├── sprites
│   │   ├── ...
│   │   └── // generated sprite images
│   ├── store
│   │   └── configureStore.js
│   └── utils
│       ├── classnames.js
│       └── immutableHelpers.js
├── package.json
├── pm2.development.json                   // pm2 configuration in development mode
├── pm2.local.json                         // pm2 configuration in development mode with file watch
├── pm2.production.json                    // pm2 configuration in production mode
├── public
│   └── assets
│   │   ├── ...
│   │   └── // webpack generated output
├── runtime
│   └── logs
│       ├── stderr.log                     // application logs stdout output
│       └── stdout.log                     // application logs stderr output
├── server
│   ├── app.js                             // server entry point
│   ├── configuration
│   │   ├── config.js                      // server common configuration
│   │   ├── development.js                 // server enviroment-based configuration
│   │   ├── production.js                  // server enviroment-based configuration
│   │   └── local.js                       // server local configuration (unneccessary)
│   ├── controllers
│   │   ├── EntryPointController.js        // predefined client-side html entry point generator
│   │   ├── ServerStatusController.js      // server statuc controller (to show uptime, release version etc.)
│   │   ├── SessionController.js           // login/logout etc.
│   │   ├── SingleUserController.js        // single user controller
│   │   └── UserCollectionController.js    // user collection controller
│   ├── core
│   │   ├── base
│   │   │   ├── Component.js
│   │   │   ├── Controller.js
│   │   │   ├── Exception.js
│   │   │   ├── Model.js
│   │   │   └── Service.js
│   │   ├── bootstrap.js
│   │   ├── components
│   │   │   ├── Pager.js
│   │   │   └── RemoteRequest.js
│   │   ├── constants
│   │   │   ├── index.js
│   │   │   └── paths.js                   // framework files locations, so to change where some files are placed you can set it here
│   │   ├── enumerations
│   │   │   ├── Environments.js
│   │   │   ├── HttpMethods.js
│   │   │   ├── PagerSortDirections.js
│   │   │   └── ServerParameters.js
│   │   ├── exceptions
│   │   │   ├── ComponentAutowireException.js
│   │   │   ├── CoreException.js
│   │   │   ├── HttpNotFoundException.js
│   │   │   ├── NotImplementedMethodException.js
│   │   │   └── SessionException.js
│   │   └── skeleton-config.js
│   ├── enumerations
│   │   └── pager
│   ├── exceptions
│   │   └── UserNotFoundException.js
│   ├── middlewares                        // predefined middlewares
│   │   ├── after
│   │   │   └── requestException.js
│   │   └── before
│   │       ├── jsonRequest.js
│   │       ├── passport.js
│   │       ├── pureSend.js
│   │       ├── requestTime.js
│   │       ├── safeRequest.js
│   │       ├── serveStatic.js
│   │       ├── session.js
│   │       ├── webpackDev.js
│   │       └── webpackHot.js
│   ├── models
│   │   └── User.js                        // predefined remote repository model
│   ├── runtime
│   ├── services
│   │   └── UserService.js                 // predefined user service
│   └── views
│       └── index.jade                     // client-side entry point html template
└── webpack
    ├── settings.js                        // webpack common environment-agnostic settings
    ├── webpack.config.development.js      // webpack + hot reload config
    └── webpack.config.production.js       // webpack production config
```

## TODO 

1. Implement Flightplan.js deployment script (restore) to deploy via ```npm run deploy:target``` ot via ```fly target```.
2. Refactor configuration (divide config declaration from data instantiation)
3. Add support to load middleware from node_modules without compatibility wrapper
