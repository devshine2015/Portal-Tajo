import React from 'react';
import { connect } from 'react-redux';
import pure from 'recompose/pure';
import { Map } from 'immutable';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import Form from 'components/Form';
import Dialog from './components/Dialog';
import DeviceSelector from 'containers/DeviceSelector';
import OfflineData from './components/OfflineData';
import { formActions, offlineDataActions } from './actions';
import { validateForm } from 'utils/forms';
import { getAppOnlineState } from 'services/Global/reducer';
import {
  getLoaderState,
  installerHasOfflineData,
} from './reducer';
import { showSnackbar } from 'containers/Snackbar/actions';
import styles from './styles.css';

const initialFields = new Map({
  name: null,
  imei: null,
  license: null,
  odometer: null,
});

class Installer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      fields: initialFields,
      cannotSubmit: true,
      dialogIsOpen: this.dialogIsOpen(props),
      noDeviceSelectedError: false,
      deviceSelected: false,
      haveToReset: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    this.props.checkStorage();
  }

  componentWillReceiveProps(nextProps) {
    this.notify(nextProps);
  }

  onChange = (e) => {
    const { name, value, type, checked } = e.target;
    let v;

    if (type === 'checkbox' && checked !== 'undefined') {
      v = checked;
    } else {
      v = value;
    }

    this.updateState(name, v);
  }

  onDeviceSelect = imei => {
    const fields = this.state.fields.set('imei', imei);

    this.setState({
      fields,
      noDeviceSelectedError: false,
      deviceSelected: true,
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const fields = this.state.fields.toObject();

    if (!this.state.deviceSelected) {
      this.setState({
        noDeviceSelectedError: true,
      });

      return;
    }

    if (!validateForm(fields)) {
      if (this.props.isOnline) {
        // this.submitForm(fields);
      } else {
        this.saveLocally(fields);
      }
    }
  }

  updateState = (name, value) => {
    const fields = this.state.fields.set(name, value);
    const cannotSubmit = validateForm(this.state.fields.toObject());

    this.setState({
      fields,
      cannotSubmit,
      haveToReset: false,
    });
  }

  dialogIsOpen(props) {
    return props.hasOfflineData && props.isOnline;
  }

  submitForm = (fields) => {
    this.props.submitForm(fields).then(() => {
      this.props.showSnackbar('Succesfully sended ✓', 2000);
      this.resetForm();
    }, () => {
      this.saveLocally(fields);
    });
  }

  saveLocally = (fields) => {
    this.props.saveLocally(fields).then(() => {
      this.props.showSnackbar('Saved locally ✓', 2000);
      this.resetForm();
    }, error => {
      console.error(error);
      this.props.showSnackbar('Cannot save to your device store', 2000);
    });
  }

  notify = (nextProps) => {
    // show/hide notifiation only navigator.onLine changed
    if (nextProps.hasOfflineData && (!this.props.isOnline && nextProps.isOnline)) {
      this.setState({
        dialogIsOpen: true,
      });
    } else if (nextProps.hasOfflineData && (this.props.isOnline && !nextProps.isOnline)) {
      this.closeDialog();
    } else if (!nextProps.hasOfflineData) {
      this.closeDialog();
    }
  }

  resetForm = () => {
    const formNode = document.forms.bounder;

    this.setState({
      fields: initialFields,
      cannotSubmit: true,
      haveToReset: true,
    });

    formNode.reset();
  }

  sendFromDialog = (e) => {
    e.preventDefault();

    this.props.sendFromStorage().catch(() => {
      this.closeDialog();
    });

    this.setState({
      dialogIsOpen: this.dialogIsOpen(this.props),
    });
  }

  closeDialog = () => {
    this.setState({
      dialogIsOpen: false,
    });
  }

  render() {
    let mainButtonText = this.props.isOnline ? 'Send' : 'Save Locally';
    const mainButtonDisabled = this.state.cannotSubmit || this.props.isLoading;

    if (this.props.isLoading) {
      mainButtonText = 'Sending...';
    }

    return (
      <div className={styles.installer}>
        <Form
          name="bounder"
          onSubmit={this.onSubmit}
          className={styles.form}
        >
          <TextField
            fullWidth
            name="name"
            onChange={this.onChange}
            floatingLabelText="Vehicle Name"
            required
          />
          <TextField
            fullWidth
            name="license"
            onChange={this.onChange}
            floatingLabelText="License Plate Number"
            required
          />
          <DeviceSelector
            onChange={this.updateState}
            onSelect={this.onDeviceSelect}
            hasError={this.state.noDeviceSelectedError}
            forcedValue={this.state.haveToReset ? '' : null}
          />
          <TextField
            fullWidth
            name="odometer"
            onChange={this.onChange}
            floatingLabelText="Current Odometer value"
            required
            type="number"
          />
          <Checkbox
            className={styles.odo}
            label="ODO value in miles"
            name="isMiles"
            onCheck={this.onChange}
          />
          <div className={styles.buttons}>
            <RaisedButton
              className={styles.submitButton}
              disabled={mainButtonDisabled}
              onClick={this.onSubmit}
              label={mainButtonText}
              type="submit"
              primary
            />
            <FlatButton
              onClick={this.resetForm}
              label="Reset"
            />
          </div>
        </Form>
        <OfflineData
          sendData={this.props.sendFromStorage}
          cleanData={this.props.cleanOfflineData}
          isOnline={this.props.isOnline}
        />
        <Dialog
          open={this.state.dialogIsOpen}
          handleSend={this.sendFromDialog}
          handleClose={this.closeDialog}
        />
      </div>
    );
  }
}

Installer.propTypes = {
  checkStorage: React.PropTypes.func.isRequired,
  cleanOfflineData: React.PropTypes.func.isRequired,
  isLoading: React.PropTypes.bool.isRequired,
  isOnline: React.PropTypes.bool.isRequired,
  hasOfflineData: React.PropTypes.bool.isRequired,
  saveLocally: React.PropTypes.func.isRequired,
  sendFromStorage: React.PropTypes.func.isRequired,
  showSnackbar: React.PropTypes.func.isRequired,
  submitForm: React.PropTypes.func.isRequired,
};

const mapState = (state) => ({
  isLoading: getLoaderState(state),
  isOnline: getAppOnlineState(state),
  hasOfflineData: installerHasOfflineData(state),
});
const mapDispatch = {
  checkStorage: offlineDataActions.checkStorage,
  cleanOfflineData: offlineDataActions.cleanOfflineData,
  saveLocally: offlineDataActions.saveLocally,
  sendFromStorage: offlineDataActions.sendFromStorage,
  showSnackbar,
  submitForm: formActions.submitForm,
};

const PureInstaller = pure(Installer);

export default connect(mapState, mapDispatch)(PureInstaller);
