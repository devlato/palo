import React, {Component} from 'react';

import styles from 'scss/components/_logout';
import classNames from 'utils/classnames';
const cx = classNames(styles);


export default class Logout extends Component {

  render() {
    return (
      <div>
        <h1 className={cx('logout__header')}>You have been logged out</h1>
      </div>
    );
  }
}
