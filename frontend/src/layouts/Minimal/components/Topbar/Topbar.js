import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar } from '@material-ui/core';

import { connect } from 'react-redux';
const useStyles = makeStyles(() => ({
  root: {
    boxShadow: 'none'
  }
}));

const Topbar = props => {
  const { className } = props;

  const classes = useStyles();

  return (
    <AppBar
      time="time"
      className={clsx(classes.root, className)}
      color="primary"
      position="fixed">
      <Toolbar>
        <RouterLink to="/">
          <h1 className="u-noEffect u-noEffect-dark-background logo">
            {'</> Dev Management'}
          </h1>
        </RouterLink>
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Topbar);
