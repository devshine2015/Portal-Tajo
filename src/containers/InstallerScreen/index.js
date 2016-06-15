import React from 'react';
import { connect } from 'react-redux';
import pure from 'recompose/pure';
import { fromJS } from 'immutable';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
// import Loader from 'components/Loader';
import Form from 'components/Form';
import Message from 'containers/Message';
import OfflineData from 'containers/OfflineData';
import Notification from 'containers/Notification';
import { submitData, saveLocally } from './actions';
import { sendFromStorage, checkStorage } from 'containers/OfflineData/actions';
import { showNotification, hideNotification } from 'containers/Notification/actions';
import { validateForm } from 'utils/forms';

import styles from './styles.css';

const initialFields = fromJS({
  name: null,
  imei: null,
  license: null,
});

class InstallerScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      fields: initialFields.toJS(),
      cannotSubmit: true,
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    this.props.checkStorage();
  }

  componentWillReceiveProps(nextProps) {
    this.resetForm(nextProps);
    this.notify(nextProps);
  }

  onChange = (e) => {
    const { name, value } = e.target;
    const nextState = Object.assign({}, {
      fields: this.state.fields,
    });
    nextState.fields[name] = value.trim();
    nextState.cannotSubmit = validateForm(nextState.fields);

    this.setState(nextState);
  }

  onSubmit = (e) => {
    e.preventDefault();

    if (!validateForm(this.state.fields)) {
      if (this.props.isOnline) {
        this.props.submitData(this.state.fields);
      } else {
        this.props.saveLocally(this.state.fields);
      }
    }
  }

  notify = (nextProps) => {
    // show/hide notifiation only navigator.onLine changed
    if (nextProps.hasOfflineData && (!this.props.isOnline && nextProps.isOnline)) {
      this.props.showNotification();
    } else if (nextProps.hasOfflineData && (this.props.isOnline && !nextProps.isOnline)) {
      this.props.hideNotification();
    }
  }

  resetForm = (nextProps) => {
    if (!this.props.submittedSuccessfully && nextProps.submittedSuccessfully) {
      const formNode = document.forms.bounder;

      this.setState({
        fields: initialFields.toJS(),
      });

      formNode.reset();
    }
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
          refs="form"
          className={styles.form}
        >
          <Message />
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
          <TextField
            fullWidth
            name="imei"
            onChange={this.onChange}
            floatingLabelText="IMEI"
            required
          />

          <RaisedButton
            disabled={mainButtonDisabled}
            onClick={this.onSubmit}
            label={mainButtonText}
            type="submit"
          />
        </Form>
        { this.props.hasOfflineData && <OfflineData /> }
        <Notification />
      </div>
    );
  }
}

InstallerScreen.propTypes = {
  checkStorage: React.PropTypes.func.isRequired,
  isLoading: React.PropTypes.bool.isRequired,
  isOnline: React.PropTypes.bool.isRequired,
  hasOfflineData: React.PropTypes.bool.isRequired,
  hideNotification: React.PropTypes.func.isRequired,
  saveLocally: React.PropTypes.func.isRequired,
  sendFromStorage: React.PropTypes.func.isRequired,
  showNotification: React.PropTypes.func.isRequired,
  submitData: React.PropTypes.func.isRequired,
  submittedSuccessfully: React.PropTypes.bool.isRequired,
};

const mapState = (state) => ({
  ...state.get('installer'),
  isOnline: state.getIn(['global', 'isOnline']),
  hasOfflineData: state.getIn(['offlineData', 'hasOfflineData']),
});
const mapDispatch = {
  checkStorage,
  hideNotification,
  saveLocally,
  sendFromStorage,
  showNotification,
  submitData,
};

const PureInstallerScreen = pure(InstallerScreen);

export default connect(mapState, mapDispatch)(PureInstallerScreen);
