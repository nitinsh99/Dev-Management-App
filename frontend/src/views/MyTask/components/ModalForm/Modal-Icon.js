import React from 'react';
import Button from '@material-ui/core/Button';

import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import EditAttributesIcon from '@material-ui/icons/EditAttributes';
import DeleteIcon from '@material-ui/icons/Delete';

const currentIcon = (method, handleOpen, submitData, classes) => {
  switch (method) {
    case 'add-section':
      return (
        <Button className={classes.importButton} onClick={handleOpen}>
          Add Section
        </Button>
      );
    case 'delete-project':
      return (
        <Button color="primary" variant="contained" onClick={submitData}>
          Delete Project
        </Button>
      );
    case 'add-task':
      return <AddIcon onClick={handleOpen} />;
    case 'edit-section':
      return <EditAttributesIcon onClick={handleOpen} />;
    case 'delete-task':
    case 'delete-section':
      return <DeleteIcon onClick={submitData} />;
    case 'edit-task':
      return <EditIcon onClick={handleOpen} />;
    default:
      break;
  }
};

export default currentIcon;
