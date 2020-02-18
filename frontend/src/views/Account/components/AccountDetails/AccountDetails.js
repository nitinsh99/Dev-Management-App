import React, { useState } from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { updateUserAction } from '../../../../redux/Auth/userinfo-action';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField
} from '@material-ui/core';
import { camelCaseToText, capitalize } from '../../../../util/method';

const useStyles = makeStyles(() => ({
  root: {}
}));

const AccountDetails = props => {
  const { className, authdata, updateUserActionSend } = props;

  const classes = useStyles();
  const {
    firstName,
    lastName,
    username,
    company,
    email,
    role,
    provinceOrState,
    country
  } = authdata.userInfo;
  const [values, setValues] = useState({
    firstName,
    lastName,
    username,
    company,
    email,
    role,
    provinceOrState,
    country
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  const onSubmitFunc = event => {
    event.preventDefault();
    updateUserActionSend(values);
  };
  return (
    <Card time="time" className={clsx(classes.root, className)}>
      <form autoComplete="off" noValidate onSubmit={e => onSubmitFunc(e)}>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            {Object.keys(values).map((property, i) => {
              const newText = capitalize(camelCaseToText(property));
              return (
                <Grid item md={6} xs={12} key={i}>
                  <TextField
                    fullWidth
                    helperText={`Please specify the ${newText}`}
                    label={newText}
                    margin="dense"
                    name={property}
                    onChange={handleChange}
                    required
                    value={values[property]}
                    variant="outlined"
                  />
                </Grid>
              );
            })}
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button color="primary" variant="contained" type="submit">
            Save details
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};
const mapStateToProps = state => state;
const mapActionToProps = {
  updateUserActionSend: updateUserAction
};
export default connect(mapStateToProps, mapActionToProps)(AccountDetails);
