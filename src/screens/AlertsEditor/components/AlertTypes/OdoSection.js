import React from 'react';
import pure from 'recompose/pure';
import {
  translate,
  makePhrasesShape,
} from 'utils/i18n';
import * as alertKinds from 'services/AlertsSystem/alertKinds';
import AlertsSection from './AlertsSection';
import OdoForm from './OdoForm';
import phrases from './PropTypes';

const AlertsOdo = ({
  translations,
}) => (
  <AlertsSection
    renderForm={(options) => (<OdoForm {...options} />)}
    myAlertKind={alertKinds._ALERT_KIND_ODO}
    actionButtonLabel={translations.add_alert}
    headerLabel={translations.odometer.toUpperCase()}
  />
);

AlertsOdo.propTypes = {
  translations: makePhrasesShape(phrases).isRequired,
};

export default pure(translate(phrases)(AlertsOdo));
