import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';

import { makeAlertConditionBackEndObject } from 'services/AlertsSystem/alertConditionHelper';
import { createAlertConditions, updateAlertCondition } from 'services/AlertsSystem/actions';
import { showSnackbar } from 'containers/Snackbar/actions';

import { TextField } from 'material-ui';
import { VelocityTransitionGroup } from 'velocity-react';

import { css } from 'aphrodite/no-important';
// import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

import classes from './classes';

import FormComponents from 'components/User/FormComponents';

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
    const fields = this.props.controlledFields.map(fld => (
      <TextField
        fullWidth
        key={fld.fieldName}
        name={fld.fieldName}
        onChange={this.onChange}
        floatingLabelText={fld.label}
        value={this.state[fld.fieldName]}
      />));
    const enterAnimation = {
      animation: 'slideDown',
      duration: 400,
      style: { height: '' },
    };
    const leaveAnimation = {
      animation: 'slideUp',
      duration: 400,
    };

    return (
      <div className={css(classes.formWrapper__inn)}>
        {this.newAlert && <FormComponents.Header>
          {this.props.headerTitle}
        </FormComponents.Header>
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
        <FormComponents.Buttons
          onSubmit={this.onSubmit}
          onCancel={this.onCancel}
          mainLabel={"Save"}
          disabled={true}
        />
      </div>
    );
  }
}

SpeedForm.propTypes = {
  headerTitle: React.PropTypes.string.isRequired,
  alert: React.PropTypes.object,
  closeForm: React.PropTypes.func.isRequired,
  // isLoading: React.PropTypes.bool.isRequired,
  isOpened: React.PropTypes.bool.isRequired,
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

const mapState = (state) => ({
  // alerts: getAlertConditions(state),
  // alertById: getAlertConditionByIdFunc(state),
});

const mapDispatch = {
  createAlertConditions,
  updateAlertCondition,
  showSnackbar,
};

export default connect(mapState, mapDispatch)(pure(SpeedForm));

// export default pure(SpeedForm);
