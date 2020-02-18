import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

const Profile = props => {
  const { className, projectdata, authdata } = props;

  const classes = useStyles();
  const { isPM } = projectdata;

  const { firstName, lastName, role, profileImage } = authdata.userInfo;
  const user = {
    name: `${firstName} ${lastName}`,
    bio: role,
    avatar: profileImage
  };
  return (
    <div className={clsx(classes.root, className)}>
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={user.avatar}
        to="/account"
      />
      <Typography className={classes.name} variant="h4">
        {user.name}
      </Typography>
      <Typography variant="body2">
        {isPM ? 'Project Manager' : user.bio}
      </Typography>
    </div>
  );
};

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Profile);
