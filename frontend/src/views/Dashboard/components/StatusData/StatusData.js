import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Typography
} from '@material-ui/core';
import {
  WaitingToStart,
  DesigningProcess,
  DevelopingProcess,
  TestingProcess,
  debuggingProcess,
  Finish
} from '../../../../util/constantVariables';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  chartContainer: {
    position: 'relative',
    height: '300px'
  },
  stats: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center'
  },
  info: {
    textAlign: 'center',
    padding: theme.spacing(0.5)
  }
}));

const statusArray = [
  WaitingToStart,
  DesigningProcess,
  DevelopingProcess,
  TestingProcess,
  debuggingProcess,
  Finish
];

const numberToPercentage = (value, total) => {
  return Math.round((value / total) * 100);
};

const StatusData = ({ taskdata, className }) => {
  const { allTasks } = taskdata;
  const classes = useStyles();
  const theme = useTheme();
  const colorArray = [
    theme.palette.primary.light,
    theme.palette.error.main,
    theme.palette.warning.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.primary.main
  ];
  const [detail, setDetail] = useState([]);
  const [stats, setStats] = useState([]);


  useEffect(() => {
    const filterData = () => {
      //init
      let total = 0;
      let statsArray = [0, 0, 0, 0, 0, 0];
      const c = [
        theme.palette.primary.light,
        theme.palette.error.main,
        theme.palette.warning.main,
        theme.palette.secondary.main,
        theme.palette.success.main,
        theme.palette.primary.main
      ];
      let detailArray = statusArray.map((e, index) => {
        return {
          title: e,
          value: 0,
          color: c[index]
        };
      });
      //calc
      allTasks.forEach(e => {
        const { status } = e;
        const currentIndex = statusArray.indexOf(status);
        statsArray[currentIndex] += 1;
        total += 1;
      });
      statsArray.forEach((e, i) => {
        statsArray[i] = numberToPercentage(statsArray[i], total);
        detailArray[i] = {
          ...detailArray[i],
          value: `${numberToPercentage(e, total)}`
        };
      });
      //input value
      setDetail(detailArray);
      setStats(statsArray);
    };
    if (allTasks !== null) {
      filterData();
    }
  }, [allTasks,
    theme.palette.error.main,
    theme.palette.primary.light,
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.warning.main]);

  const options = {
    legend: {
      display: false
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    tooltips: {
      enabled: false,
      mode: 'index',
      intersect: false,
      borderWidth: 1,
      borderColor: theme.palette.divider,
      backgroundColor: theme.palette.white,
      titleFontColor: theme.palette.text.primary,
      bodyFontColor: theme.palette.text.secondary,
      footerFontColor: theme.palette.text.secondary
    }
  };
  const data = {
    datasets: [
      {
        data: stats,
        backgroundColor: colorArray,
        borderWidth: 8,
        borderColor: theme.palette.white,
        hoverBorderColor: theme.palette.white
      }
    ],
    labels: statusArray
  };

  return (
    <Card time="time" className={clsx(classes.root, className)}>
      <CardHeader title="Status Data" />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Doughnut data={data} options={options} />
        </div>
        <div className={classes.stats}>
          {detail.map(info => (
            <div className={classes.info} key={info.title}>
              {/* {info.title === Finish ? <br /> : null} */}
              <Typography variant="body1">{info.title}</Typography>
              <Typography style={{ color: info.color }} variant="h2">
                {info.value}%
              </Typography>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
const mapStateToProps = state => state;
export default connect(mapStateToProps)(StatusData);
