import React from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import clsx from 'clsx';
//Material Ui
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Hidden, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import InputIcon from '@material-ui/icons/Input';
//Redux
import { connect } from 'react-redux';
import { logoutAction } from '../../../../redux/Auth/signin-action';
const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  }
}));

const Topbar = props => {
  const { className, onSidebarOpen, logoutActionSend, history } = props;
  const classes = useStyles();
  const logoutOnClickFunc = () => {
    logoutActionSend(history);
  };
  return (
    <AppBar className={clsx(classes.root, className)}>
      <Toolbar>
        <RouterLink to="/">
          <h1 className="u-noEffect u-noEffect-dark-background logo">
            {'</> Dev Management'}
          </h1>
        </RouterLink>
        <div className={classes.flexGrow} />
        <Hidden mdDown>
          <IconButton
            className={classes.signOutButton}
            onClick={() => logoutOnClickFunc()}
            color="inherit">
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onSidebarOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = state => state;
const mapActionToProps = {
  logoutActionSend: logoutAction
};
export default connect(mapStateToProps, mapActionToProps)(withRouter(Topbar));
