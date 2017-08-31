import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import { css } from 'aphrodite/no-important';
import { connect } from 'react-redux';
import { TextField, Paper } from 'material-ui';
import {
  translate,
  makePhrasesShape,
} from 'utils/i18n';
import { makeAlertConditionBackEndObject } from 'services/AlertsSystem/alertConditionHelper';
import { conditionsActions } from 'services/AlertsSystem/actions';
import { showSnackbar } from 'containers/Snackbar/actions';
import FormButtons from 'components/Controls/FormButtons';
import Layout from 'components/Layout';
import classes from './classes';
import phrases from './PropTypes';

function setAlertState(props) {
  return {
    maxTemp: 1,
    maxSpeed: 45,
    odoValue: 10000,
    // gfId: props.gfs.length > 0 ? props.gfs[0].id : '',
    driveTimeSec: 2.5,
    ...props.alert,
  };
}

class SpeedForm extends React.Component {

  constructor(props) {
    super(props);

    this.newAlert = this.props.alert === undefined
      || this.props.alert.id === undefined;
    /**
     * Initial values for controlled inputs
     **/
    this.state = setAlertState(props);
  }

  onChange = (e, value) => {
    const field = e.target.name;

    this.setState({
      [field]: value,
    });
  }

  onSubmit = e => {
    e.preventDefault();
    if (this.newAlert) {
      this.postNew(makeAlertConditionBackEndObject(this.state));
    } else {
      this.putExisting(makeAlertConditionBackEndObject(this.state));
    }
    // this.props.createUser(this.state)
    //   .then(() => this.props.closeForm());
    this.props.closeForm();
  }

  onCancel = () => {
    this.props.closeForm();
  }

  postNew = (newAlert) => {
    // eslint-disable-next-line
    const { translations, showSnackbar, createAlertConditions } = this.props;

    createAlertConditions([newAlert])
    .then(() => {
      showSnackbar(translations.new_alert_condition_created_successfully, 3000);
    }, () => {
      showSnackbar(translations.failed_to_create_new_alert_condition, 5000);
    });
  }

  putExisting = (newAlert) => {
    // eslint-disable-next-line
    const { translations, showSnackbar, updateAlertCondition } = this.props;

    updateAlertCondition(newAlert)
    .then(() => {
      showSnackbar(translations.alert_condition_updated_successfuly, 3000);
    }, () => {
      showSnackbar(translations.failed_to_change_alert_alert_condition, 5000);
    });
  }
  render() {
    const fields = this.props.controlledFields === undefined ? [] :
      this.props.controlledFields.map(fld => (
        <TextField
          fullWidth
          key={fld.fieldName}
          name={fld.fieldName}
          onChange={this.onChange}
          floatingLabelText={fld.label}
          value={this.state[fld.fieldName]}
        />));
    return (
      <Paper zDepth={5} className={css(classes.formWrapper__inn)} >
        {this.newAlert && <Layout.Header
          label={this.props.translations.new_alert_condition}
          style={{ padding: '0' }}
          labelStyle={{ fontSize: 16,
            color: 'rgba(0, 0, 0, 0.3)',
          }}
        />
        }
        <TextField
          fullWidth
          key="name"
          name="name"
          onChange={this.onChange}
          floatingLabelText={this.props.translations.alert_name}
          value={this.state.name}
        />
        {fields}
        {this.props.children}
        <FormButtons
          onSubmit={this.onSubmit}
          onCancel={this.onCancel}
          disabled={false}
        />
      </Paper>
    );
  }
}

SpeedForm.propTypes = {
  alert: PropTypes.object,
  closeForm: PropTypes.func.isRequired,
  controlledFields: PropTypes.arrayOf(
    PropTypes.shape({
      fieldName: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  children: PropTypes.array,
  createAlertConditions: PropTypes.func.isRequired,
  updateAlertCondition: PropTypes.func.isRequired,
  showSnackbar: PropTypes.func.isRequired,
  translations: makePhrasesShape(phrases).isRequired,
};

const mapState = null;

const mapDispatch = {
  createAlertConditions: conditionsActions.createAlertConditions,
  updateAlertCondition: conditionsActions.updateAlertCondition,
  showSnackbar,
};

export default connect(mapState, mapDispatch)(pure(translate(phrases)(SpeedForm)));

// export default pure(SpeedForm);
