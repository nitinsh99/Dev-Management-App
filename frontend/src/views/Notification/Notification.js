import React, { useEffect } from 'react';

//Redux
import { connect } from 'react-redux';
import { isPMAction } from '../../redux/Project/Project-Action';
import { CRUDTeamReqAction } from '../../redux/TeamReq/TeamReq-Action';

//Material Ui
import { IconButton, Tooltip, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Card, NoResultFound } from 'components';
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';
import { secondsToDhms } from '../../util/method';
import { noNotificaiton } from '../../util/constantImages';
const useStyles = makeStyles(() => ({
  root: { margin: '24px' },
  spacer: {
    flexGrow: 0.8
  },
  allClear: {
    display: 'block',
    margin: 'auto'
  }
}));

const DisplayNotification = ({
  CRUDTeamReqActionSend,
  team_req_data,
  authdata
}) => {
  const { teamReq } = team_req_data;
  const { userInfo } = authdata;
  const classes = useStyles();

  const getTimeInBetween = updateAt =>
    secondsToDhms(
      new Date().getTime() / 1000 - new Date(updateAt).getTime() / 1000
    );

  const getMessage = (
    receiverId,
    senderId,
    receiverUsername,
    senderUsername,
    currentUserId,
    result
  ) => {
    if (result === 'accept' || result === 'decline') {
      //receiver
      if (currentUserId === receiverId) {
        return `${senderUsername} ${result} your request`;
      }
      //sender
      else if (currentUserId === senderId) {
        return `You ${result} ${receiverUsername}'s request`;
      }
    } else if (result === 'nothing' && currentUserId === receiverId) {
      //receiver
      return `${senderUsername} sent you a request to join the project`;
    } else if (result === 'remove') {
      //receiver
      if (currentUserId === receiverId) {
        return `${senderUsername} removed you from the project`;
      } else if (currentUserId === senderId) {
        return `You removed ${receiverUsername} from the project`;
      }
    }
  };

  useEffect(() => {
    CRUDTeamReqActionSend('get');
  }, [CRUDTeamReqActionSend]);
  return (
    <div className={classes.root}>
      {teamReq && teamReq.length === 0 ? (
        <NoResultFound
          url={noNotificaiton}
          text={'No notifications at this time.'}
        />
      ) : null}
      {teamReq &&
        teamReq.map(e => {
          const { sender, receiver, result, updateAt, _id } = e;
          const updateReq = acceptOrReject => {
            CRUDTeamReqActionSend('change', null, _id, {
              result: acceptOrReject,
              receiver: sender['_id'],
              sender: receiver['_id'],
              updateAt: Date.now()
            });
            CRUDTeamReqActionSend('get');
          };
          if (sender === null || receiver === null) {
            return null;
          } else {
            return (
              <Card
                key={_id}
                action={
                  receiver['_id'] === userInfo['_id'] &&
                  result === 'nothing' ? (
                    <IconButton>
                      <CheckIcon onClick={() => updateReq('accept')} />
                      <ClearIcon onClick={() => updateReq('decline')} />
                    </IconButton>
                  ) : null
                }
                header={getMessage(
                  receiver['_id'],
                  sender['_id'],
                  `@${receiver.username}`,
                  `@${sender.username}`,
                  userInfo['_id'],
                  result
                )}
                subText={getTimeInBetween(updateAt)}
                avatar={
                  sender['_id'].toString() === userInfo['_id'].toString() ? (
                    <></>
                  ) : (
                    <Tooltip title={sender.username}>
                      <Avatar src={sender.profileImage} />
                    </Tooltip>
                  )
                }
              />
            );
          }
        })}
    </div>
  );
};

const mapActionToProps = {
  CRUDTeamReqActionSend: CRUDTeamReqAction,
  isPMActionSend: isPMAction
};
const mapStateToProps = state => state;
export default connect(mapStateToProps, mapActionToProps)(DisplayNotification);
