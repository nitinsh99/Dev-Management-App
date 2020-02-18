import React, { useState } from 'react';
import { updateUserPasswordAction } from '../../../../redux/Auth/userinfo-action';
import { addAlertAction } from '../../../../redux/Alert/Alert-Action';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
  TextField
} from '@material-ui/core';
import { connect } from 'react-redux';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Password = props => {
  const { className, updateUserPasswordActionSend, addAlertActionSend } = props;

  const classes = useStyles();

  const [values, setValues] = useState({
    password: '',
    currentPassword: '',
    confirmPassword: ''
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  const onSubFunc = e => {
    e.preventDefault();
    const { password, currentPassword, confirmPassword } = values;
    if (password !== confirmPassword) {
      return addAlertActionSend(
        'New Password and Confirm Password is incorrect'
      );
    }
    updateUserPasswordActionSend(currentPassword, password);
    setValues({
      password: '',
      currentPassword: '',
      confirmPassword: ''
    });
  };
  return (
    <Card time="time" className={clsx(classes.root, className)}>
      <form onSubmit={e => onSubFunc(e)}>
        <CardHeader subheader="Change password" title="Password" />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Current Password"
            name="currentPassword"
            onChange={handleChange}
            type="password"
            value={values.currentPassword}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="New Password"
            name="password"
            onChange={handleChange}
            style={{ marginTop: '1rem' }}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Confirm New Password"
            name="confirmPassword"
            onChange={handleChange}
            style={{ marginTop: '1rem' }}
            type="password"
            value={values.confirmPassword}
            variant="outlined"
          />
        </CardContent>
        <Divider />
        <CardActions>
          <Button color="primary" variant="outlined" type="submit">
            Update
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};
const mapActionToProps = {
  updateUserPasswordActionSend: updateUserPasswordAction,
  addAlertActionSend: addAlertAction
};
export default connect(null, mapActionToProps)(Password);
