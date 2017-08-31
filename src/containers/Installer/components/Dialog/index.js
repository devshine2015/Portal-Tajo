import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const InstallerDialog = ({
  handleClose,
  handleSend,
  open,
}) => {
  const actions = [
    <FlatButton
      label="Cancel"
      primary
      onClick={handleClose}
    />,
    <FlatButton
      label="Send"
      primary
      onClick={handleSend}
    />,
  ];

  return (
    <Dialog
      actions={actions}
      modal={false}
      open={open}
      onRequestClose={handleClose}
    >
      You have saved data on your device and now you are online, so you can try to send it!
    </Dialog>
  );
};

InstallerDialog.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleSend: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default pure(InstallerDialog);
