import React from 'react';
import {
  Dialog,
  FlatButton,
} from 'material-ui';

function actions(props) {
  return [
    <FlatButton
      label="Cancel"
      keyboardFocused
      onTouchTap={props.onCancel}
    />,
    <FlatButton
      primary
      label="Ok"
      onTouchTap={props.onOk}
    />,
  ];
}

const WarningDialog = (props) => (
  <div>
    <Dialog
      title="Warning about time and traffic consuming"
      actions={actions(props)}
      open={props.open}
      onRequestClose={props.onCancel}
    >
      You chose {props.vehiclesAmount} vehicles.<br />
      Generating and downloading events for all that
      vehicles could take a lot of time and traffic.<br />
      Are you sure?
    </Dialog>
  </div>
);

WarningDialog.propTypes = {
  // fired by clicking on Cancel button or
  // outside of dialog
  onCancel: React.PropTypes.func.isRequired,

  // fired by clicking on OK button
  onOk: React.PropTypes.func.isRequired,

  // Controls whether the Dialog is opened or not.
  open: React.PropTypes.bool.isRequired,

  // amount of selected vehicles
  vehiclesAmount: React.PropTypes.number.isRequired,
};

export default WarningDialog;
