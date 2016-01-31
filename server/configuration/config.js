'use strict';


export default {
  models: {
    url: 'http://localhost:8080'
  },
  server: {
    environment: 'development',
    port: 8095
  },
  logger: console,
  services: {
    UserService: 'UserService'
  },
  session: {
    name: 'uiSessionId',
    redisOptions: {
      prefix: 'uiSessionId:'
    },
    secret: 'very secret key'
  },
  routing: {
    routes: {
      '[GET] /api/user/exists/': 'SingleUserController.isUserExists',
      '[GET] /api/user/:id': 'SingleUserController.getById',
      '[GET] /api/user/': 'SingleUserController.getByQueryParams',
      '[GET] /api/users/': 'UserCollectionController.getByQueryParams',
      '[POST] /api/login': 'SessionController.login',
      '[GET] /api/logout': 'SessionController.logout',
      '[POST] /api/signup': 'SessionController.signup',
      '[GET] /api/uptime': 'ServerStatusController.uptime',
      '[GET] *': 'EntryPointController.getEntryPoint'
    }
  }
};
