import React from 'react';
import { connect } from 'react-redux';
import pure from 'recompose/pure';
import { Map } from 'immutable';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import Layout from 'components/Layout';
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
import { translate } from 'utils/i18n';

import styles from './styles.css';
import phrases, { phrasesShape } from './PropTypes';

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
      haveToReset: false,
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
        this.submitForm(fields);
      } else {
        this.saveLocally(fields);
      }
    }
  }

  updateState = (name, value) => {
    const fields = this.state.fields.set(name, value);
    const cannotSubmit = validateForm(fields.toObject());

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
      this.props.showSnackbar(this.props.translations.send_success, 2000);
      this.resetForm();
    }, () => {
      this.saveLocally(fields);
    });
  }

  saveLocally = (fields) => {
    this.props.saveLocally(fields).then(() => {
      this.props.showSnackbar(this.props.translations.saved_locally, 2000);
      this.resetForm();
    }, error => {
      console.error(error);
      this.props.showSnackbar(this.props.translations.cannot_save_locally, 2000);
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
      deviceSelected: false,
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
    const { translations } = this.props;

    let mainButtonText = this.props.isOnline ? translations.send : translations.save_locally;
    const mainButtonDisabled = this.state.cannotSubmit || this.props.isLoading;

    if (this.props.isLoading) {
      mainButtonText = `${translations.sending}...`;
    }

    return (
      <Layout.Content>
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
              floatingLabelText={ translations.vehicle_name }
              required
            />
            <TextField
              fullWidth
              name="license"
              onChange={this.onChange}
              floatingLabelText={ translations.license }
              required
            />
            <DeviceSelector
              onChange={this.updateState}
              onSelect={this.onDeviceSelect}
              hasError={this.state.noDeviceSelectedError}
              reset={this.state.haveToReset}
            />
            <TextField
              fullWidth
              name="odometer"
              onChange={this.onChange}
              floatingLabelText={ translations.odo_value }
              required
              type="number"
            />
            <Checkbox
              className={styles.odo}
              label={ translations.odo_in_miles }
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
                label={ translations.reset }
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
      </Layout.Content>
    );
  }
}

Installer.propTypes = {
  checkStorage: React.PropTypes.func.isRequired,
  cleanOfflineData: React.PropTypes.func.isRequired,
  isLoading: React.PropTypes.bool.isRequired,
  isOnline: React.PropTypes.bool.isRequired,
  hasOfflineData: React.PropTypes.bool.isRequired, // eslint-disable-line
  saveLocally: React.PropTypes.func.isRequired,
  sendFromStorage: React.PropTypes.func.isRequired,
  showSnackbar: React.PropTypes.func.isRequired,
  submitForm: React.PropTypes.func.isRequired,

  translations: phrasesShape.isRequired,
};

Installer.defaultProps = {
  translations: phrases,
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
const Connected = connect(mapState, mapDispatch)(PureInstaller);

export default translate(phrases)(Connected);
