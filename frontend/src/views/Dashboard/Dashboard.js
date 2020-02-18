import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { Spinner, NoResultFound } from 'components';

import CreateProject from './createForm/main';
import {
  TotalUsers,
  TasksProgress,
  TeamStatus,
  Dashboard_Task_Table as DashboardTaskTable,
  StatusData
} from './components';
import { connect } from 'react-redux';
import { getTasksAction } from '../../redux/Tasks/Tasks-action';
import { isPMAction } from '../../redux/Project/Project-Action';
import { noNotificaiton } from '../../util/constantImages';
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Dashboard = ({
  projectdata,
  authdata,
  getTasksActionSend,
  isPMActionSend,
  taskdata
}) => {
  const classes = useStyles();
  const { userInfo } = authdata;
  const { projectInfo } = projectdata;
  useEffect(() => {
    if (projectInfo) {
      const { projectManager } = projectInfo;
      getTasksActionSend(userInfo.project);
      isPMActionSend(userInfo['_id'], projectManager['_id']);
    }
  }, [projectInfo,getTasksActionSend,isPMActionSend,userInfo]);

  if (!projectInfo && projectdata.loaded === true) {
    return (
      <div className={classes.root}>
        <div className={classes.noData}>
          <CreateProject />
        </div>
      </div>
    );
  } else if (
    projectInfo &&
    projectdata.loaded === true &&
    taskdata.loaded === true
  ) {
    return (
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalUsers />
          </Grid>
          {taskdata.allTasks === null ? (
            <Grid item lg={12} sm={12} xl={12} xs={12}>
              <NoResultFound
                url={noNotificaiton}
                text="You need to create tasks to see real time data"
              />
            </Grid>
          ) : (
            <>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <TasksProgress />
              </Grid>
              <Grid item lg={7} md={7} xl={7} xs={12}>
                <TeamStatus />
              </Grid>
              <Grid item lg={7} md={7} xl={5} xs={12}>
                <StatusData />
              </Grid>
              <Grid item lg={10} md={12} xl={9} xs={12}>
                <DashboardTaskTable />
              </Grid>
            </>
          )}
        </Grid>
      </div>
    );
  } else {
    return <Spinner />;
  }
};

const mapStateToProps = state => state;
const mapActionToProps = {
  getTasksActionSend: getTasksAction,
  isPMActionSend: isPMAction
};
export default connect(mapStateToProps, mapActionToProps)(Dashboard);
