import React, { useState } from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  TableSortLabel
} from '@material-ui/core';

import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 800
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  status: {
    marginRight: theme.spacing(1)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const Dashboard_Task_Table = props => {
  const { taskdata, className } = props;
  const { allTasks } = taskdata;
  const classes = useStyles();
  const [sortOrder, setSortOrder] = useState({
    status: 'asc',
    deadline: 'asc'
  });

  const onClickSortFunc = name => {
    allTasks &&
      allTasks.sort(function(a, b) {
        if (sortOrder[name] === 'asc') {
          if (name === 'status') {
            return a[name].charCodeAt(0) - b[name].charCodeAt(0);
          } else {
            return Date.parse(a[name]) - Date.parse(b[name]);
          }
        } else {
          if (name === 'status') {
            return b[name].charCodeAt(0) - a[name].charCodeAt(0);
          } else {
            return Date.parse(b[name]) - Date.parse(a[name]);
          }
        }
      });
    if (sortOrder[name] === 'asc') {
      setSortOrder({ ...sortOrder, [name]: 'desc' });
    } else {
      setSortOrder({ ...sortOrder, [name]: 'asc' });
    }
  };

  return (
    <Card time="time" className={clsx(classes.root, className)}>
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Task Name</TableCell>
                  <TableCell>Staff</TableCell>
                  <TableCell sortDirection={sortOrder.deadline}>
                    <Tooltip enterDelay={300} title="Sort">
                      <TableSortLabel
                        active
                        direction={sortOrder.deadline}
                        onClick={() => onClickSortFunc('deadline')}>
                        Deadline
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>

                  <TableCell sortDirection={sortOrder.status}>
                    <Tooltip enterDelay={300} title="Sort">
                      <TableSortLabel
                        active
                        direction={sortOrder.status}
                        onClick={() => onClickSortFunc('status')}>
                        Status
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>

                  <TableCell>Section Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allTasks &&
                  allTasks.map(currentTask => {
                    const {
                      title,
                      deadline,
                      section,
                      status,
                      _id,
                      user
                    } = currentTask;
                    return (
                      <TableRow hover key={_id}>
                        <TableCell>{title}</TableCell>
                        <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
                        <TableCell>{deadline}</TableCell>
                        <TableCell>
                          <div className={classes.statusContainer}>
                            {status}
                          </div>
                        </TableCell>
                        <TableCell>{section.title}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Divider />
    </Card>
  );
};

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Dashboard_Task_Table);
