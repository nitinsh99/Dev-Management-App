import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Content from './Notes-Content';
import { connect } from 'react-redux';
import EventNoteIcon from '@material-ui/icons/EventNote';
import { CRUDSectionAction } from '../../../../../../redux/Sections/Sections-action';

const useStyles = makeStyles(theme => ({
  modal: {
    marginLeft: '60%'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: '100%',
    height: '100%'
  }
}));

function Notes({
  contentText,
  CRUDSectionActionSend,
  projectId,
  sectionId,
  taskId
}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');
  const handleOpen = () => {
    setValue(contentText);
    setOpen(true);
  };

  const handleClose = () => {
    setValue('');
    setOpen(false);
  };
  const submitSaveData = () => {
    CRUDSectionActionSend(
      'update-task',
      projectId,
      sectionId,
      { comment: value },
      taskId
    );
    handleClose();
  };
  return (
    <div>
      <EventNoteIcon onClick={handleOpen} />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}>
        <Fade in={open}>
          <div className={classes.paper}>
            <Content
              value={value}
              onChangeFunc={e => {
                setValue(e.target.value);
              }}
              close={handleClose}
              save={submitSaveData}
            />
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
export default connect(null, { CRUDSectionActionSend: CRUDSectionAction })(
  Notes
);
