import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { ProductsToolbar, TaskTable } from './components';
import { Spinner } from 'components';
import { CRUDSectionAction } from '../../redux/Sections/Sections-action';
import { SearchInput } from 'components';
import { isPMAction } from '../../redux/Project/Project-Action';
import { connect } from 'react-redux';
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(4)
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
}));

const MyTask = ({
  projectdata,
  authdata,
  isPMActionSend,
  sectiondata,
  CRUDSectionActionSend
}) => {
  const { userInfo } = authdata;
  const { projectInfo, isPM } = projectdata;
  const { allSections, loaded } = sectiondata;
  const classes = useStyles();
  useEffect(() => {
    if (projectInfo) {
      isPMActionSend(userInfo['_id'], projectInfo.projectManager['_id']);
      CRUDSectionActionSend('get', projectInfo['_id']);
    }
  }, [projectInfo,CRUDSectionActionSend,isPMActionSend,userInfo]);
  const [search, setSearch] = useState('');
  if (allSections && loaded) {
    const onChangeSearch = e => {
      setSearch(e.target.value);
    };
    const arrayOfTable = allSections.map(currentSection => {
      return (
        <div
          className={classes.content}
          id={currentSection.title}
          key={currentSection.title}>
          <Grid container spacing={3}>
            <TaskTable currentSection={currentSection} isPM={isPM} />
          </Grid>
        </div>
      );
    });
    return (
      <div className={classes.root}>
        {isPM ? <ProductsToolbar /> : null}
        <div className={classes.content}>
          <Grid container spacing={3}>
            <SearchInput
              className={classes.searchInput}
              value={search}
              onChange={e => onChangeSearch(e)}
              name="search task"
            />
          </Grid>
        </div>
        {arrayOfTable &&
          arrayOfTable.map(e => {
            const { id } = e.props;
            if (id.toUpperCase().indexOf(search.toUpperCase()) > -1) {
              return e;
            } else {
              return null;
            }
          })}
      </div>
    );
  } else {
    return <Spinner />;
  }
};
const mapStateToProps = state => state;
const mapActionToProps = {
  isPMActionSend: isPMAction,
  CRUDSectionActionSend: CRUDSectionAction
};
export default connect(mapStateToProps, mapActionToProps)(MyTask);
