import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
  LinearProgress
} from '@material-ui/core';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  progress: {
    marginTop: theme.spacing(3)
  }
}));

const TasksProgress = props => {
  const { className, taskdata } = props;
  const { allTasks } = taskdata;

  let completedNumber = 0;
  allTasks &&
    allTasks.forEach(e => {
      const { status } = e;
      switch (status) {
        case 'Finish':
          completedNumber += 1;
          break;
        case 'Debuging process':
          completedNumber += 5 / 6;
          break;
        case 'Testing process':
          completedNumber += 2 / 3;
          break;
        case 'Developing process':
          completedNumber += 1 / 2;
          break;
        case 'Designing process':
          completedNumber += 1 / 3;
          break;
        case 'Waiting to start':
          completedNumber += 1 / 6;
          break;
        default:
          break;
      }
    });
  const percentage =
    allTasks === null || allTasks.length === 0
      ? 0
      : (completedNumber / allTasks.length) * 100;
  const classes = useStyles();

  return (
    <Card time="time" className={clsx(classes.root, className)}>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2">
              PROJECT PROGRESS
            </Typography>
            <Typography variant="h3">{`${percentage.toFixed(0)}%`}</Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <InsertChartIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
        <LinearProgress
          className={classes.progress}
          value={percentage}
          variant="determinate"
        />
      </CardContent>
    </Card>
  );
};

const mapStateToProps = state => state;

export default connect(mapStateToProps)(TasksProgress);
