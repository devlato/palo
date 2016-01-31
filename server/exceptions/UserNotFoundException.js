'use strict';


import Exception from '@/core/exceptions/HttpNotFoundException';


class UserNotFoundException extends Exception {

  constructor(userId = '[no userId]') :UserNotFoundException {
    super('User "{userId}" not found', {userId});

    return this;
  }

}


export default UserNotFoundException;
