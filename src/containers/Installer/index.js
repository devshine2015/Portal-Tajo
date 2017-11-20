import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import pure from 'recompose/pure';
import { Map } from 'immutable';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import DealerOrCustomerPage from 'containers/DealerPage/DealerOrCustomer';
import Form from 'components/Form';
import DeviceSelector from 'containers/DeviceSelector';
import { validateForm } from 'utils/forms';
import { showSnackbar } from 'containers/Snackbar/actions';
import { translate } from 'utils/i18n';
import { formActions } from './actions';
import { getLoaderState } from './reducer';

import styles from './styles.css';
import phrases, { phrasesShape } from './PropTypes';

const initialFields = new Map({
  name: null,
  imei: null,
  license: null,
  odometer: null,
  chassisNumber: null,
});

class Installer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: initialFields,
      cannotSubmit: true,
      noDeviceSelectedError: false,
      deviceSelected: false,
      haveToReset: false,
    };

    // this.onSubmit = this.onSubmit.bind(this);
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

  onDeviceSelect = (imei) => {
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
      this.submitForm(fields);
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

  submitForm = (fields) => {
    this.props.submitForm(fields).then(() => {
      this.props.showSnackbar(this.props.translations.send_success, 2000);
      this.resetForm();
    }, () => {
      this.saveLocally(fields);
    });
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

  render() {
    const { translations } = this.props;

    let mainButtonText = translations.send;
    const mainButtonDisabled = this.state.cannotSubmit || this.props.isLoading;

    if (this.props.isLoading) {
      mainButtonText = `${translations.sending}...`;
    }

    return (
      <DealerOrCustomerPage>
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
              floatingLabelText={translations.vehicle_name}
              required
            />
            <TextField
              fullWidth
              name="chassisNumber"
              onChange={this.onChange}
              floatingLabelText={translations.chassis_number}
              value={this.state.chassisNumber}
              required
            />
            <TextField
              fullWidth
              name="license"
              onChange={this.onChange}
              floatingLabelText={translations.license_plate}
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
              floatingLabelText={translations.odo_value}
              required
              type="number"
            />
            <Checkbox
              className={styles.odo}
              label={translations.odo_in_miles}
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
                label={translations.reset}
              />
            </div>
          </Form>
        </div>
      </DealerOrCustomerPage>
    );
  }
}

Installer.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  showSnackbar: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,

  translations: phrasesShape.isRequired,
};

Installer.defaultProps = {
  translations: phrases,
};

const mapState = state => ({
  isLoading: getLoaderState(state),
});
const mapDispatch = {
  showSnackbar,
  submitForm: formActions.submitForm,
};

const PureInstaller = pure(Installer);
const Connected = connect(mapState, mapDispatch)(PureInstaller);

export default translate(phrases)(Connected);
