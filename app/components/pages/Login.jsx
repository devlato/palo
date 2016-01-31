import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {manualLogin} from 'actions/users';

import classNames from 'utils/classnames';
import styles from 'scss/components/_login';
const cx = classNames(styles);


class Login extends Component {

  constructor(props) {
    super(props);
    this._onLoginSubmit = this._onLoginSubmit.bind(this);
  }


  _onLoginSubmit() {
    const {dispatch} = this.props;
    const email = ReactDOM.findDOMNode(this.refs.email).value;
    const password = ReactDOM.findDOMNode(this.refs.password).value;
    dispatch(manualLogin({
      email: email,
      password: password
    }));
  }


  render() {
    const {authenticated, isWaiting} = this.props.user;
    if (authenticated) {
      return (
        <div className={cx('login-container')}>
          <h1 className={cx('login-header')}>You are logged in</h1>
        </div>
      );
    }

    if (isWaiting) {
      return (
        <div className={cx('login-container')}>
          <h1 className={cx('login-header')}>Waiting ...</h1>
        </div>
      );
    }

    return (
      <div className={cx('login-container')}>
        <h1 className={cx('login-header')}>Login</h1>
        <fieldset className={cx('login-fieldset')}>
            <input className={cx('login-input')} type="email"
                   ref="email" placeholder="email" />
            <input className={cx('login-input')} type="password"
                   ref="password" placeholder="password" />
            <button className={cx('login-input', 'button', 'button-green', 'login-button')}
                    onClick={this._onLoginSubmit}>Login</button>
        </fieldset>
      </div>
    );
  }
}


Login.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func
};


function mapStateToProps(state) {
  return {
    user: state.user
  };
}


export default connect(mapStateToProps)(Login);
