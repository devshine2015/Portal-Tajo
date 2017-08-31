import React from 'react';
import PropTypes from 'prop-types';
import {
  translate,
  makePhrasesShape,
} from 'utils/i18n';
import AlertForm from './AlertForm';
import phrases from './PropTypes';

const TempForm = ({
  alert,
  closeForm,
  isOpened,
  translations,
}) => (
  <AlertForm
    alert={alert}
    closeForm={closeForm}
    isOpened={isOpened}
    controlledFields={[{
      fieldName: 'maxTemp',
      label: translations.maxTemp,
    }]}
  />
);

TempForm.propTypes = {
  alert: PropTypes.object,
  closeForm: PropTypes.func.isRequired,
  isOpened: PropTypes.bool.isRequired,
  translations: makePhrasesShape(phrases).isRequired,
};

export default translate(phrases)(TempForm);
