import React from 'react';
import Route from 'react-router';

import App from 'components/common/App';
import Login from 'components/pages/Login';
import Logout from 'components/pages/Logout';
import ProfilePage from 'components/pages/ProfilePage';

 import {requireAuthentication} from 'components/common/authenticateComponent';


export default (
  <Route component={App}>
    <Route path="/" component={Login} />
    <Route path="login" component={Login} />
    <Route path="logout" component={requireAuthentication(Logout)} />
    <Route path="profile" component={requireAuthentication(ProfilePage)} />
  </Route>
);
