import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import {
  translate,
  makePhrasesShape,
} from 'utils/i18n';
import AlertForm from './AlertForm';
import phrases from './PropTypes';

const SpeedForm = ({
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
      fieldName: 'maxSpeed',
      label: translations.speed_limit,
    }]}
  />
);

SpeedForm.propTypes = {
  alert: PropTypes.object,
  closeForm: PropTypes.func.isRequired,
  isOpened: PropTypes.bool.isRequired,
  translations: makePhrasesShape(phrases).isRequired,
};

export default pure(translate(phrases)(SpeedForm));
