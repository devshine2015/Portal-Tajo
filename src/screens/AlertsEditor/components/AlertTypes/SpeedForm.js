import React from 'react';
import pure from 'recompose/pure';
// import { connect } from 'react-redux';

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

    // this.props.createUser(this.state)
    //   .then(() => this.props.closeForm());
    this.props.closeForm();
  }

  onCancel = () => {
    this.props.closeForm();
  }

  render() {
    return (
      <div>
        <FormComponents.Header>
          New Speed Alert Condition
        </FormComponents.Header>      
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
          mainLabel={"Create"}
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
  // translations: phrasesShape.isRequired,
  // roles: React.PropTypes.instanceOf(Map).isRequired,
};

// const mapState = (state) => ({
//   // alerts: getAlertConditions(state),
//   // alertById: getAlertConditionByIdFunc(state),
// });

// export default connect(mapState, mapDispatch)(pure(SpeedForm));

export default pure(SpeedForm);
