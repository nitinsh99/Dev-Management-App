import React, { useState } from 'react';
//Material UI
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
//Component
import Fade from './Modal-Fade-Animation';
import currentTextField from './Model-Content';
import currentIcon from './Modal-Icon';
//Style
import ModalFormStyle from './ModalForm-Style';
//Util
import { capitalize, getDateYearMonthDayFormat } from '../../../../util/method';
import {
  WaitingToStart,
  DesigningProcess,
  DevelopingProcess,
  TestingProcess,
  debuggingProcess,
  Finish
} from '../../../../util/constantVariables';

//Redux
import { connect } from 'react-redux';
import { CRUDProjectAction } from '../../../../redux/Project/Project-Action';
import { CRUDSectionAction } from '../../../../redux/Sections/Sections-action';
//React Router
import { withRouter } from 'react-router-dom';

const initState = sectionTitle => {
  return {
    sectionName: sectionTitle ? sectionTitle : '',
    taskName: '',
    taskDeadline: getDateYearMonthDayFormat(),
    status: null,
    person: null
  };
};

const taskOptions = [
  WaitingToStart,
  DesigningProcess,
  DevelopingProcess,
  TestingProcess,
  debuggingProcess,
  Finish
];

const SpringModal = ({
  method,
  editSectionSend,
  projectId,
  sectionId,
  sectionCurrentTitle,
  allTasksId,
  selectNothing,
  editProjectSend,
  projectdata,
  history,
  currentData
}) => {
  const classes = ModalFormStyle();
  const [open, setOpen] = React.useState(false);
  const { isPM, projectInfo } = projectdata;
  const [formData, setFormData] = useState(initState(sectionCurrentTitle));

  const clearnForm = () => {
    setFormData(initState(sectionCurrentTitle));
  };
  const handleOpen = () => {
    setOpen(true);
    if (method === 'edit-task') {
      const { status, title, deadline, username } = currentData;

      setFormData({
        ...formData,
        taskName: title,
        taskDeadline: getDateYearMonthDayFormat(deadline),
        status,
        person: username
      });
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onChangeText = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const currentTitle = () => {
    return capitalize(method.replace('-', ' '));
  };
  const submitData = () => {
    const body = {
      title: capitalize(formData.taskName),
      deadline: formData.taskDeadline,
      status: formData.status,
      user: formData.person
    };
    switch (method) {
      case 'delete-section':
        editSectionSend('delete', projectId, sectionId);
        break;
      case 'delete-project':
        editProjectSend('delete', projectId, null, history);
        break;
      case 'edit-task':
        editSectionSend(
          'update-task',
          projectId,
          sectionId,
          body,
          allTasksId[0]
        );
        handleClose();
        selectNothing();
        break;
      case 'edit-section':
        editSectionSend('change', projectId, sectionId, {
          title: formData.sectionName
        });
        handleClose();
        break;
      case 'add-section':
        editSectionSend('create', projectId, null, {
          title: formData.sectionName
        });
        handleClose();
        break;
      case 'add-task':
        editSectionSend('create-task', projectId, sectionId, body);
        handleClose();
        break;
      case 'delete-task':
        allTasksId.forEach(element => {
          editSectionSend('delete-task', projectId, sectionId, null, element);
        });
        selectNothing();
        break;
      default:
        break;
    }
    clearnForm();
  };

  return (
    <div>
      {currentIcon(method, handleOpen, submitData, classes)}
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
        }}
        style={{ zIndex: 5000 }}>
        <Fade in={open}>
          <div className={classes.root}>
            <div className={classes.paper}>
              <form onSubmit={submitData}>
                <Grid
                  container
                  spacing={3}
                  style={{ margin: '5%', padding: '2px' }}>
                  <Grid item xs={5}>
                    <Paper className={classes.paperGrid}>
                      <img
                        src={`/images/${method}.png`}
                        style={{ width: '100%', height: '100%' }}
                        alt="sections-and-tasks-img"
                      />
                    </Paper>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography variant="h1" className={classes.form}>
                      {currentTitle()}
                    </Typography>
                    <br />
                    {currentTextField(
                      method,
                      onChangeText,
                      formData,
                      isPM,
                      classes,
                      projectInfo.allStaff,
                      taskOptions
                    )}
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
                      type="submit">
                      SAVE <i className="fas fa-arrow-right"></i>
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};
const mapActionToProps = {
  editSectionSend: CRUDSectionAction,
  edtProjectSend: CRUDProjectAction
};
const mapStateToProps = state => state;
export default connect(
  mapStateToProps,
  mapActionToProps
)(withRouter(SpringModal));
