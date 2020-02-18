import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { loginAction } from '../../redux/Auth/signin-action';
import { signupAction } from '../../redux/Auth/signup-action';
import validate from 'validate.js';
import useStyle from './LoginFormStyle';
import {
  Grid,
  Button,
  TextField,
  Link,
  FormHelperText,
  Checkbox,
  Typography
} from '@material-ui/core';
import { connect } from 'react-redux';
import { capitalize, fullText } from '../../util/method';
import signinSchema from './SignInSchema';
import signupSchema from './SignUpSchema';
function getWindowDimensions() {
  return window.innerWidth;
}

const signinImage =
  'url("https://images.unsplash.com/photo-1549692520-acc6669e2f0c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1200&q=80")';
const signUpImage =
  'url(https://images.unsplash.com/photo-1581437697080-e628ea437d8e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80)';

const LoginForm = ({ method, history, signupActionSend, loginActionSend }) => {
  const classes = useStyle({
    backgroundImage: method === 'login' ? signinImage : signUpImage
  });
  const [screenSizeWidth, setScreenSizeWidth] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setScreenSizeWidth(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      first_name: '',
      last_name: '',
      user_name: '',
      email: '',
      password: '',
      role: '',
      province_or_state: '',
      country: ''
    },
    touched: {},
    errors: {}
  });

  useEffect(() => {
    const errors = validate(
      formState.values,
      method === 'login' ? signinSchema : signupSchema
    );
    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values, method]);

  const handleChange = event => {
    event.persist();
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };
  const {
    email,
    first_name,
    last_name,
    password,
    user_name,
    province_or_state,
    country,
    role
  } = formState.values;
  const submitData = event => {
    event.preventDefault();
    if (method === 'login') {
      loginActionSend(email, password, history);
    } else {
      signupActionSend(
        first_name,
        last_name,
        email,
        password,
        user_name,
        province_or_state,
        country,
        role,
        history
      );
    }
  };
  const displayForm = () => {
    const { values } = formState;
    const arrayOfKeys = Object.keys(values);
    return arrayOfKeys.map((e, i) => {
      const textForm = fullText(e);
      if (e !== 'policy') {
        if (
          method !== 'login' ||
          (method === 'login' && e === 'email') ||
          e === 'password'
        ) {
          return (
            <TextField
              required
              className={classes.textField}
              error={hasError(e)}
              helperText={hasError(e) ? formState.errors[e][0] : null}
              fullWidth={
                (i + 1) % 3 === 0 || method === 'login' || screenSizeWidth < 500
                  ? true
                  : false
              }
              label={capitalize(textForm)}
              name={e}
              onChange={handleChange}
              type={
                e === 'email' ? 'email' : e === 'password' ? 'password' : 'text'
              }
              value={formState.values[e]}
              variant="outlined"
              inputProps={{
                maxLength: 32
              }}
              key={i}
            />
          );
        } else {
          return null;
        }
      } else {
        return null;
      }
    });
  };
  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container>
        <Grid className={classes.quoteContainer} item lg={5}>
          <div className={classes.quote}>
            <div className={classes.quoteInner}>
              <Typography className={classes.quoteText} variant="h1">
                {method === 'login'
                  ? 'Welcome Back!'
                  : 'Make every day counts.'}
              </Typography>
            </div>
          </div>
        </Grid>
        <Grid className={classes.content} item lg={7} xs={12}>
          <div className={classes.content}>
            <div className={classes.contentBody}>
              <form className={classes.form} onSubmit={e => submitData(e)}>
                <Typography className={classes.title} variant="h2">
                  {method === 'login' ? 'Sign in' : 'Create new account'}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {method === 'login'
                    ? null
                    : 'Use your email to create new account'}
                </Typography>
                {displayForm()}
                {method === 'login' ? null : (
                  <>
                    <div className={classes.policy}>
                      <Checkbox
                        checked={formState.values.policy || false}
                        className={classes.policyCheckbox}
                        color="primary"
                        name="policy"
                        onChange={handleChange}
                      />
                      <Typography
                        // className={classes.policyText}
                        color="textSecondary"
                        variant="body1">
                        I have read the{' '}
                        <Link
                          color="primary"
                          to="/about"
                          target="_blank"
                          underline="always"
                          component={RouterLink}
                          variant="h6">
                          Why Dev Management?
                        </Link>
                      </Typography>
                    </div>
                    {hasError('policy') && (
                      <FormHelperText error>
                        {formState.errors.policy[0]}
                      </FormHelperText>
                    )}
                  </>
                )}
                <Button
                  className={classes.submitButton}
                  color="primary"
                  disabled={!formState.isValid}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained">
                  Sign {method === 'login' ? 'in' : 'up'} now
                </Button>
                <Typography color="textSecondary" variant="body1">
                  {method === 'login'
                    ? "Don't have an account? "
                    : 'Already have an account? '}
                  <Link
                    component={RouterLink}
                    to={method === 'login' ? '/sign-up' : '/sign-in'}
                    variant="h6">
                    Sign {method === 'login' ? 'up' : 'in'}
                  </Link>
                </Typography>
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

const mapActionToProps = {
  signupActionSend: signupAction,
  loginActionSend: loginAction
};

export default connect(null, mapActionToProps)(withRouter(LoginForm));
