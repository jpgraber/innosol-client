import './vendor';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory, Route } from 'react-router';
import { hydrateApp } from './actions/app';
import { Provider } from 'react-redux';
import configureStore from './store/configure-store';
import MainLayout from './layouts/main-layout';
import EmptyLayout from './layouts/empty-layout';
import AdminLayout from './layouts/admin-layout';
import UserReports from './containers/userReports/user-reports';
import AdminDashboard from './containers/admin-dashboard';
import Login from './containers/login/login';
import Logout from './components/logout/index';
import AdminTeams from './containers/adminTeams/admin-teams';
import AdminUsers from './components/admin/users';
import { initSockJS } from './middleware/socket';
import { getBootData } from './services/storage.service';
import './index.css';

/**
 * Create redux store
 */
const store = configureStore();

/**
 * hydrate the app
 */
store.dispatch(hydrateApp(getBootData()));

/**
 * Connect the client web socket
 */

const socket = initSockJS(store)
socket.connectSocket();
socket.identifySocket();

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route component={MainLayout} onEnter={requireAuth}>
        <Route path="/" component={UserReports} />
      </Route>
      <Route component={EmptyLayout}>
        <Route path="/login" component={Login} onEnter={unauthorizedOnly} />
        <Route path="/logout" component={Logout} />
      </Route>
      <Route component={AdminLayout} onEnter={onAdminEnter} >
        <Route path="/admin" component={AdminDashboard} />
        <Route path="/admin/teams" component={AdminTeams} />
        <Route path="/admin/users" component={AdminUsers} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);

function onAdminEnter(nextState, replace) {
  if (!isAdmin()) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname }
    });
    return;
  }
  socket.joinRoom('admin');
}

function isAuthenticated() {
  return store.getState().getIn(['auth', 'status']) === 'authenticated';
}

function isAdmin() {
  return isAuthenticated() && store.getState().getIn(['auth', 'user', 'role']) === 'admin';
}

function requireAuth (nextState, replace) {
  if (!isAuthenticated()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    });
  }
}

function unauthorizedOnly(nextState, replace) {
  if (isAuthenticated()) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname }
    });
  }
}
