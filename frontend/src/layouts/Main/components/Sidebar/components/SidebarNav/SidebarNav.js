/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React from 'react';
import { withRouter } from 'react-router-dom';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { List, ListItem, Button, colors } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import { logoutAction } from '../../../../../../redux/Auth/signin-action';
import { CRUDTeamReqAction } from '../../../../../../redux/TeamReq/TeamReq-Action';

const useStyles = makeStyles(theme => ({
  root: {},
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    color: colors.blueGrey[800],
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightMedium
  },
  icon: {
    color: theme.palette.icon,
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    '& $icon': {
      color: theme.palette.primary.main
    }
  }
}));

const SidebarNav = props => {
  const { projectdata, pages, className, history, logoutActionSend } = props;

  const classes = useStyles();
  return (
    <List className={clsx(classes.root, className)}>
      {pages.map(page => {
        const { href, title, icon } = page;
        const onClickFunc = () => {
          if (href === '/sign-in') {
            logoutActionSend(history);
          } else {
            history.push(href);
          }
        };
        return (
          <ListItem className={classes.item} disableGutters key={title}>
            <Button
              activeclassname={classes.active}
              className={classes.button}
              onClick={() => onClickFunc()}
              disabled={
                projectdata['projectInfo']
                  ? false
                  : href === '/users' || href === '/MyTask'
                  ? true
                  : false
              }>
              <div className={classes.icon}>
                {href === '/notification' ? (
                  <Badge color="primary">{icon}</Badge>
                ) : (
                  icon
                )}
              </div>
              {title}
            </Button>
          </ListItem>
        );
      })}
    </List>
  );
};

const mapActionToProps = {
  logoutActionSend: logoutAction,
  CRUDTeamReqActionSend: CRUDTeamReqAction
};
const mapStateToProps = state => state;
export default connect(
  mapStateToProps,
  mapActionToProps
)(withRouter(SidebarNav));
