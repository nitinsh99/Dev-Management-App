import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Chart } from 'react-chartjs-2';
import { ThemeProvider } from '@material-ui/styles';
import validate from 'validate.js';

import { chartjs } from './helpers';
import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import validators from './common/validators';
import Routes from './Routes';
import Alert from './components/Alert/Alert';
import { connect } from 'react-redux';

import { setAuthToken } from './util/method';
const browserHistory = createBrowserHistory();

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw
});

validate.validators = {
  ...validate.validators,
  ...validators
};

const App = props => {
  const { authdata } = props;
  if (!localStorage.token && authdata.token) {
    setAuthToken(authdata.token);
  }
  return (
    <>
      <Alert />
      <ThemeProvider theme={theme}>
        <Router history={browserHistory}>
          <Routes />
        </Router>
      </ThemeProvider>
    </>
  );
};
const mapStateToProps = state => state;
export default connect(mapStateToProps)(App);
