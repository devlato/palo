import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import SideMenu from 'components/components/SideMenu';
import UnauthenticatedSideMenu from 'components/components/UnauthenticatedSideMenu';
import Header from 'components/components/Header';
import UnauthenticatedHeader from 'components/components/UnauthenticatedHeader';
import Footer from 'components/components/Footer';

import 'scss/common/main';

import classNames from 'utils/classnames';
import styles from 'scss/components/_layout';
const cx = classNames(styles);


/*
 * This component operates as a "Controller-View". It listens for changes in the
 * Store and passes the new data to its children.
 *
 * React provides the kind of composable views we need for the view layer.
 * Close to the top of the nested view hierarchy, a special kind of view listens
 * for events that are broadcast by the stores that it depends on. One could call this
 * a controller-view, as it provides the glue code to get the data from the stores
 * and to pass this data down the chain of its descendants. We might have one of these
 * controller views governing any significant section of the page.
 *
 * When it receives an event from the store, it first requires the new data via the store's
 * public getter methods. It then calls its own setState() or forceUpdate() methods, causing
 * its own render() method and the render() method of all its descendants to run.
 *
 * We often pass the entire state of the store down the chain of views in a single object,
 * allowing different descendants to use what they need. In addition to keeping the controller-like
 * behavior at the top of the hierarchy, and thus keeping our descendant.
 */
class App extends Component {
  render() {
    return (
      <div className={cx('app-container-wrapper')}>
        <div className={cx('app-content')}>
          Hello from app
        </div>
      </div>
    );
  }
}


App.propTypes = {
  children: PropTypes.object,
  token: PropTypes.string,
  isAuthenticated: PropTypes.boolean
};


function mapStateToProps(state) {
  return {
    token: state.user.token,
    isAuthenticated: state.user.authenticated
  };
}


export default connect(mapStateToProps)(App);
