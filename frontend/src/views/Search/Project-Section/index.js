import React, { useState, useEffect } from 'react';
import { Button, IconButton, Avatar, Tooltip } from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';
import Grid from '@material-ui/core/Grid';
import SendIcon from '@material-ui/icons/Send';
import { makeStyles } from '@material-ui/styles';
import {
  searchProjectAction,
  searchingAction
} from '../../../redux/Search-Project/SearchProject-Action';
import { isPMAction } from '../../../redux/Project/Project-Action';
import { CRUDTeamReqAction } from '../../../redux/TeamReq/TeamReq-Action';
import { SearchInput, Card, NoResultFound } from 'components';
import { connect } from 'react-redux';
import { notFoundImage } from '../../../util/constantImages';

const useStyles = makeStyles(theme => ({
  root: { margin: '24px' },
  searchInput: {
    maxWidth: '60%',
    margin: 'auto',
    marginTop: '2%'
  },
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 0.8
  }
}));

const Index = props => {
  const {
    searchingActionSend,
    searchProjectActionSend,
    CRUDTeamReqActionSend,
    isPMActionSend,
    projectdata,
    searchprojectdata,
    authdata
  } = props;

  const { userInfo } = authdata;
  const { projectInfo, isPM } = projectdata;
  const { projectResults } = searchprojectdata;

  useEffect(() => {
    isPMActionSend(
      userInfo['_id'],
      projectInfo ? projectInfo.projectManager['_id'] : null
    );
  }, [projectInfo,userInfo,isPMActionSend]);

  const classes = useStyles();
  const [s, setS] = useState('');

  const changeSearch = e => {
    setS(e.target.value);
  };
  const onSubmitData = () => {
    searchingActionSend();
    searchProjectActionSend(s);
    setS(s);
  };

  return (
    <div className={classes.root}>
      <div className={classes.searchInput}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={9}>
            <SearchInput
              value={s}
              onChange={e => changeSearch(e)}
              name="Find Project"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button color="primary" onClick={onSubmitData} variant="contained">
              Search
            </Button>
          </Grid>
        </Grid>
      </div>
      <div>
        {projectResults && projectResults.length === 0 ? (
          <NoResultFound url={notFoundImage} />
        ) : null}
      </div>
      {projectResults &&
        projectResults.map(e => {
          const { projectManager, projectName } = e;
          const { firstName, lastName, profileImage, _id } = projectManager;
          const sendReq = () => {
            CRUDTeamReqActionSend('create', e['_id'], null, {
              sender: userInfo['_id'],
              receiver: _id
            });
          };
          return (
            <Card
              key={projectName}
              action={
                isPM && userInfo.project === e['_id'] ? null : (
                  <IconButton onClick={sendReq}>
                    <SendIcon/>
                  </IconButton>
                )
              }
              header={`Project "${projectName}"`}
              subText={`Manage by ${firstName} ${lastName}`}
              avatar={
                <AvatarGroup>
                  <Avatar src={profileImage} />
                  <Tooltip title={projectName}>
                    <Avatar>...</Avatar>
                  </Tooltip>
                </AvatarGroup>
              }
            />
          );
        })}
    </div>
  );
};
const mapActionToProps = {
  searchingActionSend: searchingAction,
  searchProjectActionSend: searchProjectAction,
  CRUDTeamReqActionSend: CRUDTeamReqAction,
  isPMActionSend: isPMAction
};
const mapStateToProps = state => state;
export default connect(mapStateToProps, mapActionToProps)(Index);
