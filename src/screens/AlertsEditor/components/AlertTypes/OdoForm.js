import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import {
  translate,
  makePhrasesShape,
} from 'utils/i18n';
import AlertForm from './AlertForm';
import phrases from './PropTypes';

const OdoForm = ({
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
      fieldName: 'odoValue',
      label: translations.distance_limit,
    }]}
  />
);

OdoForm.propTypes = {
  alert: PropTypes.object,
  closeForm: PropTypes.func.isRequired,
  isOpened: PropTypes.bool.isRequired,
  translations: makePhrasesShape(phrases).isRequired,
};

export default pure(translate(phrases)(OdoForm));
