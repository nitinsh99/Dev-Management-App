import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  content: {
    paddingTop: 0,
    textAlign: 'center'
  },
  image: {
    marginTop: 50,
    display: 'inline-block',
    maxWidth: '100%',
    width: 560
  }
}));

const NotFound = ({ authdata, history }) => {
  const classes = useStyles();
  const { isAuth } = authdata;
  return (
    <div className={classes.root}>
      <Grid container justify="center" spacing={4}>
        <Grid item lg={6} xs={12}>
          <div className={classes.content}>
            <Typography variant="h1">
              404: The page you are looking for isn’t here
            </Typography>
            <Typography variant="subtitle2">
              {isAuth
                ? 'You either tried some shady route or you came here by mistake. Whichever it is, try using the navigation'
                : 'Please login or sign up if you have not do so.'}
            </Typography>
            <img
              alt="Under development"
              className={classes.image}
              src="/images/not_found.png"
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
const mapStateToProps = state => state;
export default connect(mapStateToProps)(NotFound);
