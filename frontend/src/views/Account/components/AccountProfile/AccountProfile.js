import React from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import {
  deleteUserAction,
  updateImageAction
} from '../../../../redux/Auth/userinfo-action';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button
} from '@material-ui/core';

import { convertTimeToYearMonthDay } from '../../../../util/method';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {},
  details: {
    display: 'flex'
  },
  avatar: {
    marginLeft: 'auto',
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0
  },
  progress: {
    marginTop: theme.spacing(2)
  },
  uploadButton: {
    marginRight: theme.spacing(2)
  }
}));

const AccountProfile = ({
  deleteUserActionSend,
  className,
  authdata,
  updateImageActionSend,
  history
}) => {
  const classes = useStyles();
  const {
    firstName,
    lastName,
    provinceOrState,
    country,
    createdAt,
    profileImage
  } = authdata.userInfo;
  const deleteMeFunc = () => {
    history.push('/sign-up');
    deleteUserActionSend();
  };
  return (
    <Card time="time" className={clsx(classes.root, className)}>
      <CardContent>
        <div className={classes.details}>
          <div>
            <Typography gutterBottom variant="h2">
              {`${firstName} ${lastName}`}
            </Typography>
            <Typography
              className={classes.locationText}
              color="textSecondary"
              variant="body1">
              {provinceOrState}, {country}
            </Typography>
            <Typography
              className={classes.dateText}
              color="textSecondary"
              variant="body1">
              {convertTimeToYearMonthDay(createdAt)}
            </Typography>
          </div>
          <Avatar className={classes.avatar} src={profileImage} />
        </div>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          className={classes.uploadButton}
          variant="contained"
          component="label"
          color="primary">
          Upload picture
          <input
            type="file"
            style={{ display: 'none' }}
            onChange={e => updateImageActionSend(e.target.files[0])}
          />
        </Button>
        <Button variant="text" onClick={deleteMeFunc}>
          Delete My Account
        </Button>
      </CardActions>
    </Card>
  );
};

const mapStateToProps = state => state;
const mapActionToProps = {
  deleteUserActionSend: deleteUserAction,
  updateImageActionSend: updateImageAction
};
export default connect(
  mapStateToProps,
  mapActionToProps
)(withRouter(AccountProfile));
