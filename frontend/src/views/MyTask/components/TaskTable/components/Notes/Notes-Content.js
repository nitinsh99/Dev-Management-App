import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Typography from '@material-ui/core/Typography';
import SortIcon from '@material-ui/icons/Sort';
const useStyles = makeStyles({
  root: {
    '& .MuiTextField-root': {
      margin: '2%',
      width: '80%'
    }
  },
  items: {
    justifyContent: 'center',
    verticalAlign: 'middle'
  }
});

export default function Content({ onChangeFunc, value, save, close }) {
  const classes = useStyles();
  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={() => {
        save();
        close();
      }}>
      <Typography variant="h4" gutterBottom>
        Notes <SortIcon />
      </Typography>
      <TextField
        id="outlined-multiline-static"
        label="Comment"
        multiline
        rows="9"
        columns="9"
        onChange={e => onChangeFunc(e)}
        value={value}
        variant="outlined"
        fullWidth
        className={classes.items}
      />
      <br />
      <Button
        variant="contained"
        color="primary"
        size="small"
        startIcon={<SaveIcon />}
        className={classes.items}
        type="submit">
        Save
      </Button>
    </form>
  );
}
