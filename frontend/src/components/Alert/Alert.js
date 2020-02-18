import React from 'react';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';

const SnackBar = props => {
  const { alertdata } = props;
  const vertical = 'bottom';
  const horizontal = 'left';

  return (
    <>
      {alertdata
        ? alertdata.map(e => {
            const { msg, id } = e;
            return (
              <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                key={id}
                open={true}
                message={msg}
              />
            );
          })
        : null}
    </>
  );
};
const mapStateToProps = state => state;
export default connect(mapStateToProps)(SnackBar);
