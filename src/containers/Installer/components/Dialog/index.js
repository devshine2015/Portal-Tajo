import React from 'react';
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
      onTouchTap={handleClose}
    />,
    <FlatButton
      label="Send"
      primary
      onTouchTap={handleSend}
    />,
  ];

  return (
    <Dialog
      actions={actions}
      modal={false}
      open={open}
      onRequestClose={handleClose}
    >
      You have saved data on your device and now you're online, so you can try to send it!
    </Dialog>
  );
};

InstallerDialog.propTypes = {
  handleClose: React.PropTypes.func.isRequired,
  handleSend: React.PropTypes.func.isRequired,
  open: React.PropTypes.bool.isRequired,
};

export default pure(InstallerDialog);
