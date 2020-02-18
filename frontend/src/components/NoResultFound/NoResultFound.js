import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  content: {
    paddingTop: 20,
    textAlign: 'center'
  },
  image: {
    marginTop: 10,
    display: 'inline-block',
    maxWidth: '100%',
    width: 560
  }
}));

const NotFound = ({ url, text }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container justify="center" spacing={4}>
        <Grid item lg={6} xs={12}>
          <div className={classes.content}>
            <img alt="unable to load" className={classes.image} src={url} />
            <Typography variant="h3">{text}</Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
export default NotFound;
