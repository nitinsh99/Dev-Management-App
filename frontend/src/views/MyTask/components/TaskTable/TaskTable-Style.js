import { lighten, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  },
  rootToolBar: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1)
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.warning.main,
          backgroundColor: lighten(theme.palette.warning.main, 0.85)
        }
      : {
          color: theme.palette.text.warning,
          backgroundColor: theme.palette.warning.dark
        },
  title: {
    flex: '1 1 100%'
  }
}));

export default useStyles;
