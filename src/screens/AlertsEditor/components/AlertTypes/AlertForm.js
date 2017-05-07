import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';

import { makeAlertConditionBackEndObject } from 'services/AlertsSystem/alertConditionHelper';
import { conditionsActions } from 'services/AlertsSystem/actions';
import { showSnackbar } from 'containers/Snackbar/actions';

import { TextField, Paper } from 'material-ui';

import { css } from 'aphrodite/no-important';
// import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

import classes from './classes';

import FormButtons from 'components/Controls/FormButtons';
import Layout from 'components/Layout';

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
    this.props.createAlertConditions([newAlert])
    .then(() => {
      this.props.showSnackbar('New Alert created successfuly', 3000);
    }, () => {
      this.props.showSnackbar('Failed to create new ALERT', 5000);
    });
  }

  putExisting = (newAlert) => {
    this.props.updateAlertCondition(newAlert)
    .then(() => {
      this.props.showSnackbar('Alert updated successfuly', 3000);
    }, () => {
      this.props.showSnackbar('Failed to change alert ALERT', 5000);
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
          label={this.props.headerTitle}
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
          floatingLabelText="alert name"
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
  headerTitle: React.PropTypes.string.isRequired,
  alert: React.PropTypes.object,
  closeForm: React.PropTypes.func.isRequired,
  controlledFields: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      fieldName: React.PropTypes.string.isRequired,
      label: React.PropTypes.string.isRequired,
    })
  ).isRequired,

  children: React.PropTypes.array,
  createAlertConditions: React.PropTypes.func.isRequired,
  updateAlertCondition: React.PropTypes.func.isRequired,
  showSnackbar: React.PropTypes.func.isRequired,
};

const mapState = null;

const mapDispatch = {
  createAlertConditions: conditionsActions.createAlertConditions,
  updateAlertCondition: conditionsActions.updateAlertCondition,
  showSnackbar,
};

export default connect(mapState, mapDispatch)(pure(SpeedForm));

// export default pure(SpeedForm);
