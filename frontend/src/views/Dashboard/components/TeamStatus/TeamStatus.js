import React from 'react';
import clsx from 'clsx';
import { Bar } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/styles';
import { Card, CardHeader, CardContent, Divider } from '@material-ui/core';
import palette from 'theme/palette';
import { options } from './chart';
import { connect } from 'react-redux';

import { convertTimeToYearMonthDay } from '../../../../util/method';

const useStyles = makeStyles(() => ({
  root: {},
  chartContainer: {
    height: 400,
    position: 'relative'
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));
const getPastDatesInISO = () => {
  function getDate(days) {
    const date = new Date();
    return date.setDate(date.getDate() + parseInt(days));
  }
  const pastDaysArray = [];
  for (let i = 0; i > -6; i--) {
    pastDaysArray.push(convertTimeToYearMonthDay(getDate(i)));
  }
  return pastDaysArray.reverse();
};

const getCompletedtaskdataFunc = taskInfo => {
  const arrayOfData = getPastDatesInISO();

  const completedtaskdata = [0, 0, 0, 0, 0, 0];
  taskInfo &&
    taskInfo.forEach(e => {
      const { status, updateAt } = e;
      const currentTaskUpdateDate = convertTimeToYearMonthDay(updateAt);
      const index = arrayOfData.indexOf(currentTaskUpdateDate);
      if (status === 'Finish' && index !== -1) {
        completedtaskdata[index] += 1;
      }
    });
  return completedtaskdata;
};

const TeamStatus = props => {
  const { taskdata, className } = props;

  const { allTasks } = taskdata;

  const classes = useStyles();
  const dataChart = {
    labels: getPastDatesInISO(),
    datasets: [
      {
        label: 'Completed Tasks',
        backgroundColor: palette.primary.main,
        data: getCompletedtaskdataFunc(allTasks)
      }
    ]
  };
  return (
    <Card time="time" className={clsx(classes.root, className)}>
      <CardHeader title="Tasks Completed Past 6 Days" />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Bar data={dataChart} options={options} />
        </div>
      </CardContent>
      <Divider />
    </Card>
  );
};
const mapStateToProps = state => state;
export default connect(mapStateToProps)(TeamStatus);
