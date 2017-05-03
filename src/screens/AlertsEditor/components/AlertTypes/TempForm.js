import React from 'react';
// import pure from 'recompose/pure';

import AlertForm from './AlertForm';

const TempForm = ({
  alert,
  closeForm,
  isOpened,
}) => (
  <AlertForm
    alert={alert}
    headerTitle={"New Temperature Alert Condition"}
    closeForm={closeForm}
    isOpened={isOpened}
    controlledFields={[{ fieldName: 'maxTemp',
      label: 'Maximum temperature' }]}
  />
);

TempForm.propTypes = {
  alert: React.PropTypes.object,
  closeForm: React.PropTypes.func.isRequired,
  // isLoading: React.PropTypes.bool.isRequired,
  isOpened: React.PropTypes.bool.isRequired,
};

export default TempForm;
