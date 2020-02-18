import React, { useEffect } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';
import { connect } from 'react-redux';
import { CRUDProjectAction } from './redux/Project/Project-Action';
import { WithSpinner, Spinner } from 'components';

import {
  Dashboard as DashboardView,
  MyTask as MyTaskView,
  UserList as UserListView,
  Account as AccountView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView,
  Notification as NotificationView,
  About as AboutView
} from './views';
import SearchRoute from './views/Search/index';

const Routes = ({ authdata, projectdata, CRUDProjectActionSend }) => {
  const { isAuth, loaded, userInfo } = authdata;
  const projectLoaded = projectdata.loaded;
  const RouteWithLayoutFunc = (component, path, layout) => {
    return (
      <RouteWithLayout
        component={component}
        exact
        path={path}
        layout={layout}
      />
    );
  };
  useEffect(() => {
    if (isAuth === true && userInfo && userInfo.project)  {
      CRUDProjectActionSend('get', userInfo.project);
    }
  }, [isAuth, CRUDProjectActionSend,userInfo]);
  if (isAuth === true) {
    return (
      <Switch>
        <RouteWithLayout
          component={WithSpinner(SearchRoute, projectLoaded)}
          path={'/search'}
          layout={MainLayout}
        />
        {RouteWithLayoutFunc(
          WithSpinner(NotificationView, projectLoaded),
          '/notification',
          MainLayout
        )}
        {RouteWithLayoutFunc(
          WithSpinner(DashboardView, projectLoaded),
          '/',
          MainLayout
        )}
        {RouteWithLayoutFunc(
          WithSpinner(DashboardView, projectLoaded),
          '/dashboard',
          MainLayout
        )}
        {RouteWithLayoutFunc(
          WithSpinner(AccountView, projectLoaded),
          '/account',
          MainLayout
        )}
        {userInfo.project ? (
          <Switch>
            {RouteWithLayoutFunc(
              WithSpinner(UserListView, projectLoaded),
              '/users',
              MainLayout
            )}
            {RouteWithLayoutFunc(
              WithSpinner(MyTaskView, projectLoaded),
              '/MyTask',
              MainLayout
            )}
          </Switch>
        ) : null}
        <RouteWithLayout component={NotFoundView} layout={MainLayout} />
      </Switch>
    );
  } else if (isAuth === false && loaded === true) {
    return (
      <Switch>
        {RouteWithLayoutFunc(SignInView, '/', MinimalLayout)}
        {RouteWithLayoutFunc(SignUpView, '/sign-up', MinimalLayout)}
        {RouteWithLayoutFunc(SignInView, '/sign-in', MinimalLayout)}
        {RouteWithLayoutFunc(AboutView, '/about', MinimalLayout)}
        <RouteWithLayout component={NotFoundView} layout={MinimalLayout} />
        <Redirect to="/" />
      </Switch>
    );
  } else if (loaded === false) {
    return <Spinner />;
  }
};

const mapStateToProps = state => state;
const mapActionsToProps = {
  CRUDProjectActionSend: CRUDProjectAction
};
export default connect(mapStateToProps, mapActionsToProps)(Routes);
