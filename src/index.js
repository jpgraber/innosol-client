import 'rxjs/add/observable/dom/ajax';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import { hydrateApp } from './actions/app';
import { Provider } from 'react-redux';
import configureStore from './store/configure-store';
import MainLayout from './layouts/main-layout';
import EmptyLayout from './layouts/empty-layout';
import AdminLayout from './layouts/admin-layout';
import Reports from './containers/reports.container';
import Login from './views/login/login';
import Logout from './views/logout/index';
import Admin from './containers/admin.container';
import AdminTeams from './views/admin/teams';
import { connectSocket } from './middleware/socket';
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
connectSocket(store);

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route component={MainLayout} onEnter={requireAuth}>
        <Route path="/" component={Reports} />
      </Route>
      <Route component={EmptyLayout}>
        <Route path="/login" component={Login} onEnter={unauthorizedOnly} />
        <Route path="/logout" component={Logout} />
      </Route>
      <Route component={AdminLayout} onEnter={adminRestricted} >
        <Route path="/admin" component={AdminTeams} />
        <Route path="/admin/teams" component={AdminTeams} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);

function adminRestricted(nextState, replace) {
  if (!isAdmin()) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname }
    });
  }
}

function isAuthenticated() {
  return store.getState().getIn(['auth', 'isAuthenticated']);
}

function isAdmin() {
  return isAuthenticated() && store.getState().getIn(['auth', 'user', 'role']) === 'sys-admin';
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
