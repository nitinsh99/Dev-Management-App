import React, { useEffect } from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
//Material Ui
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import { getInitials } from 'helpers';

//Redux
import { deleteUserFromAProjectAction } from '../../../../redux/Auth/userinfo-action';

import { connect } from 'react-redux';
import { isPMAction } from '../../../../redux/Project/Project-Action';
import { convertTimeToYearMonthDay } from '../../../../util/method';
import { CRUDTeamReqAction } from 'redux/TeamReq/TeamReq-Action';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const UsersTable = props => {
  const {
    projectdata,
    authdata,
    className,
    users,
    isPMActionSend,
    deleteUserFromAProjectActionSend,
    CRUDProjectActionSend
  } = props;
  const { userInfo } = authdata;
  const { projectInfo, isPM } = projectdata;
  const { projectManager } = projectInfo;
  const classes = useStyles();
  useEffect(() => {
    if (projectInfo) {
      isPMActionSend(userInfo['_id'], projectManager['_id']);
    }
  }, [userInfo,projectInfo,projectManager,isPMActionSend]);

  const removeUserFromTeam = userId => {
    deleteUserFromAProjectActionSend(
      userId,
      projectInfo['_id'],
      userInfo['_id']
    );
    CRUDProjectActionSend('get', projectInfo['_id']);
  };
  return (
    <Card time="time" className={clsx(classes.root, className)}>
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Registration date</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users &&
                  users.map(user => {
                    const {
                      _id,
                      role,
                      profileImage,
                      firstName,
                      lastName,
                      createdAt,
                      username
                    } = user;
                    return (
                      <TableRow className={classes.tableRow} hover key={_id}>
                        <TableCell>
                          <div className={classes.nameContainer}>
                            <Avatar
                              className={classes.avatar}
                              src={profileImage}>
                              {getInitials(`${firstName} ${lastName}`)}
                            </Avatar>
                            <Typography variant="body1">{`${firstName} ${lastName}`}</Typography>
                          </div>
                        </TableCell>
                        <TableCell>@{username}</TableCell>
                        <TableCell>
                          {_id === projectManager['_id']
                            ? 'Project Manager'
                            : role}
                        </TableCell>
                        <TableCell>
                          {convertTimeToYearMonthDay(createdAt)}
                        </TableCell>
                        <TableCell>
                          {isPM ? (
                            _id === projectManager['_id'] ? null : (
                              <CancelIcon
                                onClick={() => removeUserFromTeam(_id)}
                              />
                            )
                          ) : null}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
    </Card>
  );
};

const mapStateToProps = state => state;
const mapActionToProps = {
  isPMActionSend: isPMAction,
  deleteUserFromAProjectActionSend: deleteUserFromAProjectAction,
  CRUDProjectActionSend: CRUDTeamReqAction
};
export default connect(mapStateToProps, mapActionToProps)(UsersTable);
