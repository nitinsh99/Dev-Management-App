import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 3
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paperGrid: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow: '0px 2px 30px 0px rgba(0, 0, 0, 0.1)',
    marginLeft: '5'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '1px solid white',
    height: '100vh',
    width: '100vw',
    padding: 'theme.spacing(2, 4, 3)'
  },
  form: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  tops: {
    justifyContent: 'center',
    display: 'flex'
  },
  textFieldDate: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: 200
  },
  selectOptionsForm: {
    minWidth: 120,
    marginTop: theme.spacing(2)
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  spanText: {
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif'
  }
}));

export default useStyles;
