import React from 'react';
import pure from 'recompose/pure';

import AlertForm from './AlertForm';

import { TextField } from 'material-ui';

// import { css } from 'aphrodite/no-important';
// import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

// import classes from './classes';

class SpeedForm extends React.Component {

  render() {
    const speedField = [{ fieldName: 'maxSpeed',
          label: 'Speed Limit' }];
    return (<AlertForm alert={this.props.alert}
      closeForm={this.props.closeForm}
      isOpened={this.props.isOpened}
      controlledFields={speedField}
    />
    );
  }
}

SpeedForm.propTypes = {
  alert: React.PropTypes.object,
  closeForm: React.PropTypes.func.isRequired,
  // isLoading: React.PropTypes.bool.isRequired,
  isOpened: React.PropTypes.bool.isRequired,
};

export default pure(SpeedForm);
