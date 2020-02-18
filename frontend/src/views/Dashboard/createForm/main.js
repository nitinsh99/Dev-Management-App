import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring'; // web.cjs is required for IE 11 support
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';
import { CRUDProjectAction } from '../../../redux/Project/Project-Action';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { capitalize } from '../../../util/method';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 3
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paperGrid: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow: '0px 2px 30px 0px rgba(0, 0, 0, 0.1)',
    marginLeft: '5'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '1px solid white',
    height: '100vh',
    width: '100vw',
    padding: 'theme.spacing(2, 4, 3)'
  },
  form: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  tops: {
    justifyContent: 'center',
    display: 'flex'
  }
}));

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    }
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

const SpringModal = props => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [projectName, setProjectName] = React.useState('');
  const { CRUDProjectActionSend } = props;
  const handleOpen = () => {
    setOpen(true);
  };
  const onChangeText = e => {
    setProjectName(e.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const createProjectFunc = () => {
    handleClose();
    CRUDProjectActionSend('create', null, {
      projectName: capitalize(projectName)
    });
  };
  return (
    <div>
      <div className={classes.tops}>
        <Button onClick={handleOpen} variant="contained">
          Create a Project
        </Button>
      </div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}>
        <Fade in={open}>
          <div className={classes.root}>
            <div className={classes.paper}>
              <Grid
                container
                spacing={3}
                style={{ margin: '5%', padding: '2px' }}>
                <Grid item xs={5}>
                  <Paper className={classes.paperGrid}>
                    <img
                      src="https://i.ibb.co/s1RJZSX/create-Project.png"
                      style={{ width: '100%', height: '100%' }}
                      alt="create-project-img"
                    />
                  </Paper>
                </Grid>
                <Grid item xs={7}>
                  <Typography variant="h1" className={classes.form}>
                    Name your project
                  </Typography>
                  <br />
                  <TextField
                    id="filled-basic"
                    label="Project Name"
                    variant="filled"
                    className={classes.form}
                    onChange={e => onChangeText(e)}
                    value={projectName}
                  />
                  <br />
                  <Button
                    variant="outlined"
                    className={classes.form}
                    color="primary"
                    onClick={handleClose}>
                    <i className="fas fa-arrow-left"></i> BACK
                  </Button>
                  <Button
                    variant="outlined"
                    className={classes.form}
                    color="primary"
                    onClick={createProjectFunc}>
                    NEXT <i className="fas fa-arrow-right"></i>
                  </Button>
                </Grid>
              </Grid>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};
const mapActionToProps = {
  CRUDProjectActionSend: CRUDProjectAction
};
export default connect(null, mapActionToProps)(SpringModal);
