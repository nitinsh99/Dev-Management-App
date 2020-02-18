import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { UsersTable } from './components';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const UserList = props => {
  const classes = useStyles();
  const { projectdata } = props;
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <UsersTable users={projectdata.projectInfo.allStaff} />
      </div>
    </div>
  );
};
const mapStateToProps = state => state;
export default connect(mapStateToProps)(UserList);
