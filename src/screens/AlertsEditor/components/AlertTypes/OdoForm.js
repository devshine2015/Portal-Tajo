import React from 'react';
import pure from 'recompose/pure';

import AlertForm from './AlertForm';

const OdoForm = ({
  alert,
  closeForm,
  isOpened,
}) => (
    <AlertForm alert={alert}
      headerTitle={"New Distance Alert Condition"}
      closeForm={closeForm}
      isOpened={isOpened}
      controlledFields={[{ fieldName: 'odoValue',
          label: 'Distance Limit'  }]}
    />
);

OdoForm.propTypes = {
  alert: React.PropTypes.object,
  closeForm: React.PropTypes.func.isRequired,
  // isLoading: React.PropTypes.bool.isRequired,
  isOpened: React.PropTypes.bool.isRequired,
};

export default pure(OdoForm);
