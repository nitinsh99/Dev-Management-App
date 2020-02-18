import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
const useStyles = makeStyles(theme => ({
  root: { background: 'white', marginTop: '-5%' },
  small: {
    flexGrow: 1
  },
  big: {
    flexGrow: 1,
    margin: '-2rem 15rem 0 15rem'
  },
  firstPager: {
    padding: theme.spacing(2),
    textAlign: 'center',
    marginTop: '-2rem',
    marginBottom: '1rem',
    boxShadow: '0px 2px 30px 0px rgba(0, 0, 0, 0.1)'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    marginTop: '6rem',
    marginBottom: '1rem',
    boxShadow: '0px 2px 30px 0px rgba(0, 0, 0, 0.1)'
  },
  image: {
    display: 'inline-block',
    maxWidth: '100%'
  },
  text: {
    margin: 'auto'
  },
  textRight: {
    textAlign: 'start',
    padding: '10%'
  },
  textLeft: {
    textAlign: 'end',
    padding: '10%'
  }
}));
function getWindowDimensions() {
  return window.innerWidth;
}
function About() {
  const classes = useStyles();
  const [fontSize, setFontSize] = useState('h1');
  const [screenSizeWidth, setScreenSizeWidth] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setScreenSizeWidth(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });
  useEffect(() => {
    if (screenSizeWidth < 500) {
      setFontSize('body2');
    } else if (screenSizeWidth < 800) {
      setFontSize('subtitle2');
    } else if (screenSizeWidth < 1100) {
      setFontSize('h5');
    } else if (screenSizeWidth < 1300) {
      setFontSize('h3');
    } else {
      setFontSize('h1');
    }
  }, [screenSizeWidth]);
  return (
    <div className={classes.root}>
      <div className={screenSizeWidth < 1000 ? classes.small : classes.big}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant={fontSize} className={classes.textRight}>
              <KeyboardBackspaceIcon
                onClick={() => {
                  window.close();
                }}
              />
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.firstPager}>
              <img
                alt="Benfit #1"
                className={classes.image}
                src="/images/Manage.png"
              />
            </Paper>
          </Grid>
          <Grid item xs={6} className={classes.text}>
            <Typography variant={fontSize} className={classes.textRight}>
              #1 Easily to keep track of what needs to be done.
            </Typography>
          </Grid>
          <Grid item xs={6} className={classes.text}>
            <Typography variant={fontSize} className={classes.textLeft}>
              #2 Better team communication and collaboration
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <img
                alt="Benfit #2"
                className={classes.image}
                src="/images/colab.png"
              />
            </Paper>
          </Grid>

          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <img
                alt="Benfit #3"
                className={classes.image}
                src="/images/time-management.png"
              />
            </Paper>
          </Grid>
          <Grid item xs={6} className={classes.text}>
            <Typography
              variant={fontSize}
              //   component="h2"
              className={classes.textRight}>
              #3 Better time management and less procrastination.
            </Typography>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default About;
