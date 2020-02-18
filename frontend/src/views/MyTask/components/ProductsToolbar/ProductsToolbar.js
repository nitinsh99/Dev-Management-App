import React from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';

import ModalForm from '../ModalForm/ModelFormIndex';
import { CRUDProjectAction } from '../../../../redux/Project/Project-Action';
import { withRouter } from 'react-router-dom';
const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  }
}));

const ProductsToolbar = props => {
  const { projectdata, className, CRUDProjectActionSend, history } = props;

  const classes = useStyles();
  const { projectInfo } = projectdata;
  return (
    <div time="time" className={clsx(classes.root, className)}>
      <div className={classes.row}>
        <span className={classes.spacer} />
        <ModalForm projectId={projectInfo['_id']} method={'add-section'} />
        <ModalForm
          projectId={projectInfo['_id']}
          method={'delete-project'}
          editProjectSend={CRUDProjectActionSend}
          history={history}
        />
      </div>
    </div>
  );
};

const mapStateToProps = state => state;
const mapActionsToProps = {
  CRUDProjectActionSend: CRUDProjectAction
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withRouter(ProductsToolbar));
