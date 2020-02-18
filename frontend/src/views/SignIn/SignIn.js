// import React, { useState, useEffect } from 'react';
// import { Link as RouterLink, withRouter } from 'react-router-dom';
// import { loginAction } from '../../redux/Auth/signin-action';
// import validate from 'validate.js';
// import useStyles from './Signin-Style';
// import { Grid, Button, TextField, Link, Typography } from '@material-ui/core';
// import { connect } from 'react-redux';
// import schema from './Signin-Schema';

// const SignIn = props => {
//   const { history, signinActionSend } = props;

//   const classes = useStyles();

//   const [formState, setFormState] = useState({
//     isValid: false,
//     values: {},
//     touched: {},
//     errors: {}
//   });
//   useEffect(() => {
//     const errors = validate(formState.values, schema);

//     setFormState(formState => ({
//       ...formState,
//       isValid: errors ? false : true,
//       errors: errors || {}
//     }));
//   }, [formState.values]);

//   const handleChange = event => {
//     event.persist();

//     setFormState(formState => ({
//       ...formState,
//       values: {
//         ...formState.values,
//         [event.target.name]:
//           event.target.type === 'checkbox'
//             ? event.target.checked
//             : event.target.value
//       },
//       touched: {
//         ...formState.touched,
//         [event.target.name]: true
//       }
//     }));
//   };

//   const handleSignIn = event => {
//     event.preventDefault();
//     const { email, password } = formState.values;
//     signinActionSend(email, password, history);
//   };

//   const hasError = field =>
//     formState.touched[field] && formState.errors[field] ? true : false;

//   return (
//     <div className={classes.root}>
//       <Grid className={classes.grid} container>
//         <Grid className={classes.quoteContainer} item lg={5}>
//           <div className={classes.quote}>
//             <div className={classes.quoteInner}>
//               <Typography className={classes.quoteText} variant="h1">
//                 Welcome Back!
//               </Typography>
//             </div>
//           </div>
//         </Grid>
//         <Grid className={classes.content} item lg={7} xs={12}>
//           <div className={classes.content}>
//             <div className={classes.contentBody}>
//               <form className={classes.form} onSubmit={e => handleSignIn(e)}>
//                 <Typography className={classes.title} variant="h2">
//                   Sign in
//                 </Typography>
//                 <TextField
//                   className={classes.textField}
//                   error={hasError('email')}
//                   fullWidth
//                   helperText={
//                     hasError('email') ? formState.errors.email[0] : null
//                   }
//                   label="Email address"
//                   name="email"
//                   onChange={handleChange}
//                   type="email"
//                   value={formState.values.email || ''}
//                   variant="outlined"
//                   required
//                 />
//                 <TextField
//                   required
//                   className={classes.textField}
//                   error={hasError('password')}
//                   fullWidth
//                   helperText={
//                     hasError('password') ? formState.errors.password[0] : null
//                   }
//                   label="Password"
//                   name="password"
//                   onChange={handleChange}
//                   type="password"
//                   value={formState.values.password || ''}
//                   variant="outlined"
//                 />
//                 <Button
//                   className={classes.signInButton}
//                   color="primary"
//                   disabled={!formState.isValid}
//                   fullWidth
//                   size="large"
//                   type="submit"
//                   variant="contained">
//                   Sign in
//                 </Button>
//                 <Typography color="textSecondary" variant="body1">
//                   Don't have an account?{' '}
//                   <Link component={RouterLink} to="/sign-up" variant="h6">
//                     Sign up
//                   </Link>
//                 </Typography>
//               </form>
//             </div>
//           </div>
//         </Grid>
//       </Grid>
//     </div>
//   );
// };
// const mapActionToProps = {
//   signinActionSend: loginAction
// };
// export default connect(null, mapActionToProps)(withRouter(SignIn));

import React from 'react';
import { LoginForm } from 'components';

const SignIn = () => <LoginForm method="login" />;

export default SignIn;
