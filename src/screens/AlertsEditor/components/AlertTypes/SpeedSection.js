import React from 'react';
import pure from 'recompose/pure';
import {
  translate,
  makePhrasesShape,
} from 'utils/i18n';
import * as alertKinds from 'services/AlertsSystem/alertKinds';
import AlertsSection from './AlertsSection';
import SpeedForm from './SpeedForm';
import phrases from './PropTypes';

const AlertsSpeed = ({
  translations,
}) => (
  <AlertsSection
    renderForm={options => (<SpeedForm {...options} />)}
    myAlertKind={alertKinds._ALERT_KIND_SPEEDING}
    actionButtonLabel={translations.add_alert}
    headerLabel={translations.speeding.toUpperCase()}
  />
);

AlertsSpeed.propTypes = {
  translations: makePhrasesShape(phrases).isRequired,
};

export default pure(translate(phrases)(AlertsSpeed));
