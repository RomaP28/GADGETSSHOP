import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import AppContext from '../context';

export function AlertMessage({ open }) {
  const { setAlertOpen } = React.useContext(AppContext);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen(false);
  };

  return (
    <Snackbar open={open[0]} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={open[2]} sx={{ width: '100%' }}>
        {open[1]}
      </Alert>
    </Snackbar>

  );
}