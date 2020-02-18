import React, { useState, useEffect } from 'react';
import { Button, IconButton, Tooltip, Avatar } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import SendIcon from '@material-ui/icons/Send';
import { makeStyles } from '@material-ui/styles';
import {
  searchingAction,
  searchUserAction
} from '../../../redux/Search-User/SearchUser-Action';
import { isPMAction } from '../../../redux/Project/Project-Action';
import { CRUDTeamReqAction } from '../../../redux/TeamReq/TeamReq-Action';
import { SearchInput, Card, NoResultFound } from 'components';
import { connect } from 'react-redux';
const useStyles = makeStyles(theme => ({
  root: { margin: '24px' },
  searchInput: {
    maxWidth: '60%',
    margin: 'auto'
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
    searchUserActionSend,
    CRUDTeamReqActionSend,
    isPMActionSend,
    projectdata,
    searchuserdata,
    authdata
  } = props;

  const { userInfo } = authdata;
  const { projectInfo, isPM } = projectdata;
  const { userResults } = searchuserdata;

  useEffect(() => {
    isPMActionSend(
      userInfo['_id'],
      projectInfo ? projectInfo.projectManager['_id'] : null
    );
  }, [projectInfo,isPMActionSend,userInfo]);

  const classes = useStyles();
  const [s, setS] = useState('');

  const changeSearch = e => {
    setS(e.target.value);
  };
  const onSubmitData = () => {
    searchingActionSend();
    searchUserActionSend(s);
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
              name="Find User"
            />
          </Grid>
          <Grid item xs={12} sm={3} onClick={onSubmitData}>
            <Button color="primary" variant="contained">
              Search
            </Button>
          </Grid>
        </Grid>
      </div>
      {userResults && userResults.length === 0 ? (
        <NoResultFound
          url={'/images/nodata.png'}
          text={'No data at this time.'}
        />
      ) : null}
      {userResults &&
        userResults.map(e => {
          const { username, profileImage, role, _id } = e;
          const sendReq = () => {
            CRUDTeamReqActionSend('create', userInfo.project, null, {
              sender: userInfo['_id'],
              receiver: _id
            });
          };
          return (
            <Card
              key={_id}
              action={
                isPM && _id !== userInfo['_id'] ? (
                  <IconButton onClick={sendReq}>
                    <SendIcon />
                  </IconButton>
                ) : null
              }
              header={`@${username}`}
              subText={role}
              avatar={
                <Tooltip title={username}>
                  <Avatar src={profileImage} />
                </Tooltip>
              }
            />
          );
        })}
    </div>
  );
};
const mapActionToProps = {
  searchingActionSend: searchingAction,
  searchUserActionSend: searchUserAction,
  CRUDTeamReqActionSend: CRUDTeamReqAction,
  isPMActionSend: isPMAction
};
const mapStateToProps = state => state;
export default connect(mapStateToProps, mapActionToProps)(Index);
