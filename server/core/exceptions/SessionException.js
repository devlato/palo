'use strict';


import Exception from '@/core/exceptions/CoreException';


class SessionException extends Exception {

  constructor(sessionId = '[unknown]') :SessionException {
    super('Cannot destroy session for session id "{sessionId}"', {sessionId});

    return this;
  }

}


export default SessionException;
