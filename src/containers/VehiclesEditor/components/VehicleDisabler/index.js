import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import ButtonWithProgress from 'components/ButtonWithProgress';

import { metaShape } from './PropTypes';

const DisableDialog = ({
  handleClose,
  handleConfirm,
  open,
  meta,
}) => {
  const actions = [
    <FlatButton
      label="Cancel"
      primary
      onTouchTap={handleClose}
    />,
    <FlatButton
      label="Confirm"
      primary
      onTouchTap={handleConfirm}
    />,
  ];
  const hasDevice = !!meta.deviceId;

  return (
    <Dialog
      actions={actions}
      open={open}
      onRequestClose={handleClose}
    >
      You are going to disable the vehicle, it will not be available in your fleet anymore.
      <br />
      { hasDevice && `Device with IMEI ${meta.deviceId} 
      will be detached and available to attach again to another vehicle.` }
    </Dialog>
  );
};

DisableDialog.propTypes = {
  handleClose: React.PropTypes.func.isRequired,
  handleConfirm: React.PropTypes.func.isRequired,
  open: React.PropTypes.bool.isRequired,
  meta: metaShape.isRequired,
};

class VehicleDisabler extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dialogIsOpen: false,
    };
  }

  onDisableClick = () => {
    this.openDialog();
  }

  onConfirm = () => {
    this.closeDialog();

    this.props.disableVehicle();
  }

  closeDialog = () => {
    this.setState({
      dialogIsOpen: false,
    });
  }

  openDialog = () => {
    this.setState({
      dialogIsOpen: true,
    });
  }

  render() {
    return (
      <span className={this.props.className}>
        <ButtonWithProgress
          disabled={this.props.disabled}
          onClick={this.onDisableClick}
          isLoading={this.props.isLoading}
          label={ this.props.label }
          secondary
        />
        <DisableDialog
          open={this.state.dialogIsOpen}
          handleConfirm={this.onConfirm}
          handleClose={this.closeDialog}
          meta={this.props.meta}
        />
      </span>
    );
  }
}

VehicleDisabler.propTypes = {
  className: React.PropTypes.string,
  disabled: React.PropTypes.bool.isRequired,
  disableVehicle: React.PropTypes.func.isRequired,
  isLoading: React.PropTypes.bool.isRequired,
  label: React.PropTypes.string,
  meta: metaShape.isRequired,
};

VehicleDisabler.defaultProps = {
  label: 'disable',
};

export default VehicleDisabler;
