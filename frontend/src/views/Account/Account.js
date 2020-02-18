import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { Spinner } from 'components';

import { AccountProfile, AccountDetails, Password } from './components';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Account = ({ authdata }) => {
  const classes = useStyles();
  const { loaded } = authdata;
  if (loaded) {
    return (
      <div className={classes.root}>
        <Grid container spacing={4}>
          <Grid item lg={4} md={6} xl={4} xs={12}>
            <AccountProfile />
            <br />
            <Password />
          </Grid>
          <Grid item lg={8} md={6} xl={8} xs={12}>
            <AccountDetails />
          </Grid>
          <Grid item lg={4} md={6} xl={4} xs={12}></Grid>
        </Grid>
      </div>
    );
  } else {
    return <Spinner />;
  }
};
const mapStateToProps = state => state;
export default connect(mapStateToProps)(Account);
