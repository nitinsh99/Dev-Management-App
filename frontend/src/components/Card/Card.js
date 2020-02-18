import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CardHeader, Card } from '@material-ui/core';

const useStyles = makeStyles({
  card: {
    maxWidth: '50%',
    maxHeight: '50%',
    margin: 'auto',
    marginTop: '2%'
  }
});

const CardComponent = props => {
  const { header, subText, avatar, action } = props;
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={avatar}
        action={action}
        title={header}
        subheader={subText}
      />
    </Card>
  );
};

export default CardComponent;
