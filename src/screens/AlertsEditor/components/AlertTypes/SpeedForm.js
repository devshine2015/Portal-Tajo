import React from 'react';
import pure from 'recompose/pure';

import AlertForm from './AlertForm';

const SpeedForm = ({
  alert,
  closeForm,
  isOpened,
}) => (
  <AlertForm
    alert={alert}
    headerTitle={"New Speed Limit Alert Condition"}
    closeForm={closeForm}
    isOpened={isOpened}
    controlledFields={[{ fieldName: 'maxSpeed',
      label: 'Speed Limit' }]}
  />
);

SpeedForm.propTypes = {
  alert: React.PropTypes.object,
  closeForm: React.PropTypes.func.isRequired,
  // isLoading: React.PropTypes.bool.isRequired,
  isOpened: React.PropTypes.bool.isRequired,
};

export default pure(SpeedForm);
