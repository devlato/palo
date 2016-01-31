import 'es6-promise';
import Fetch from 'isomorphic-fetch';
import * as Types from 'constants/actionTypes';


function makeUserRequest(method, data, api='/api/login') {
  return Fetch(api, {
    method: method,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}


function beginLogin() {
  return { type: Types.MANUAL_LOGIN_USER };
}


function loginSuccess() {
  return { type: Types.LOGIN_SUCCESS_USER };
}


function loginError() {
  return { type: Types.LOGIN_ERROR_USER };
}


function signUpError() {
  return { type: Types.SIGNUP_ERROR_USER };
}


function beginSignUp() {
  return { type: Types.SIGNUP_USER };
}


function signUpSuccess() {
  return { type: Types.SIGNUP_SUCCESS_USER };
}


function beginLogout() {
  return { type: Types.LOGOUT_USER};
}


function logoutSuccess() {
  return { type: Types.LOGOUT_SUCCESS_USER};
}


function logoutError() {
  return { type: Types.LOGOUT_ERROR_USER};
}


export function manualLogin(data) {
  return (dispatch) => {
    dispatch(beginLogin());

    return makeUserRequest('post', data, '/api/login')
      .then((response) => {
        if (response.status === 200) {
          dispatch(loginSuccess());
        } else {
          dispatch(loginError());
        }
      });
  };
}


export function signUp(data) {
  return (dispatch) => {
    dispatch(beginSignUp());

    return makeUserRequest('post', data, '/api/signup')
      .then( response => {
        if (response.status === 200) {
          dispatch(signUpSuccess());
        } else {
          dispatch(signUpError());
        }
      });
  };
}


export function logOut() {
  return (dispatch) => {
    dispatch(beginLogout());

    return Fetch('/api/logout', {
      method: 'get',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }
    })
      .then( response => {
        if (response.status === 200) {
          dispatch(logoutSuccess());
        } else {
          dispatch(logoutError());
        }
      });
  };
}
