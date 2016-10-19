import React from 'react';
import { connect } from 'react-redux';
import pure from 'recompose/pure';
import cs from 'classnames';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';
import WarningDialog from '../WarningDialog';
import { eventActions } from 'containers/Report/actions';
import {
  getIsForced,
  getIsTooManyVehiclesSelected,
  getSelectedVehiclesAmount,
} from 'containers/Report/reducer';

import styles from './styles.css';

const warnMessage = 'I need to choose more vehicles';

const STYLES = {
  toggleRoot: {
    width: 'auto',
    display: 'inline-block',
  },
  toggleLabel: {
    fontSize: 13,
    color: 'rgba(0, 0, 0, 0.498039)',
    lineHeight: '120%',
    display: 'inline-block',
    width: 'auto',
  },
};

const Hint = () => <div className={styles.hint}>*Pick up to 3 vehicles for getting events</div>;

class RawDataButtons extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      dialogOpened: false,
    };
  }

  onDialogCancel = () => {
    this.changeDialogOpenState(false);
  }

  onDialogOk = () => {
    this.props.generateEvents();
    this.changeDialogOpenState(false);
  }

  onToggle = (e, toggled) => {
    this.props.allowPickMore(toggled);
  }

  onPrimaryClick = () => {
    if (this.props.tooManyVehiclesSelected) {
      this.changeDialogOpenState(true);
    } else {
      this.props.generateEvents();
    }
  }

  changeDialogOpenState(dialogOpened) {
    this.setState({
      dialogOpened,
    });
  }

  render() {
    const containerClassName = cs(styles.container, this.props.containerClassName);
    const btnClassName = cs(styles.button, this.props.buttonClassName);
    let btnIsDisabled;

    if (this.props.forced) {
      btnIsDisabled = false;
    } else {
      btnIsDisabled = this.props.tooManyVehiclesSelected;
    }

    return (
      <div className={containerClassName}>

        <div className={styles.top}>
          <RaisedButton
            className={btnClassName}
            label="Save raw data"
            onClick={this.onPrimaryClick}
            disabled={btnIsDisabled}
            primary
          />
          <Toggle
            className={styles.toggle}
            label={warnMessage}
            labelPosition="right"
            style={STYLES.toggleRoot}
            labelStyle={STYLES.toggleLabel}
            toggled={this.props.forced}
            onToggle={this.onToggle}
          />
        </div>
        <Hint />

        <WarningDialog
          open={this.state.dialogOpened}
          onCancel={this.onDialogCancel}
          onOk={this.onDialogOk}
          vehiclesAmount={this.props.selectedVehiclesAmount}
        />

      </div>
    );
  }
}

RawDataButtons.propTypes = {
  // className for container
  containerClassName: React.PropTypes.string,

  // button className
  buttonClassName: React.PropTypes.string,

  // callback on primary button click
  generateEvents: React.PropTypes.func.isRequired,

  // true by default;
  // false if less than 3 vehicles are chosen
  tooManyVehiclesSelected: React.PropTypes.bool.isRequired,

  // callback to allow pick more than X vehicles
  allowPickMore: React.PropTypes.func.isRequired,

  // allowed to choose and save events for more vehicles
  forced: React.PropTypes.bool.isRequired,

  // display amount of selected vehicles in dialog
  selectedVehiclesAmount: React.PropTypes.number.isRequired,
};

const mapState = state => ({
  tooManyVehiclesSelected: getIsTooManyVehiclesSelected(state),
  forced: getIsForced(state),
  selectedVehiclesAmount: getSelectedVehiclesAmount(state),
});
const mapDispatch = {
  allowPickMore: eventActions.allowPickMore,
};

const PureRawDataButtons = pure(RawDataButtons);

export default connect(mapState, mapDispatch)(PureRawDataButtons);
