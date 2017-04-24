import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';

import { makeAlertConditionBackEndObject } from 'services/AlertsSystem/alertConditionHelper';
import { createAlertConditions, updateAlertCondition } from 'services/AlertsSystem/actions';
import { showSnackbar } from 'containers/Snackbar/actions';

import { TextField } from 'material-ui';

// import { css } from 'aphrodite/no-important';
// import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

// import classes from './classes';

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

    this.newAlert = this.props.alert === undefined;
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
    return (
      <div>
        {this.newAlert && <FormComponents.Header>
          New Speed Alert Condition
        </FormComponents.Header>
        }
        <TextField
          fullWidth
          name="name"
          onChange={this.onChange}
          floatingLabelText="alert name"
          value={this.state.name}
        />
        <TextField
          name="maxSpeed"
          onChange={this.onChange}
          floatingLabelText={ "max speed" }
          value={this.state.maxSpeed}
          type="number"
        />
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
  alert: React.PropTypes.object,
  closeForm: React.PropTypes.func.isRequired,
  // isLoading: React.PropTypes.bool.isRequired,
  isOpened: React.PropTypes.bool.isRequired,

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
