import React from 'react';
import pure from 'recompose/pure';
import {
  translate,
  makePhrasesShape,
} from 'utils/i18n';
import * as alertKinds from 'services/AlertsSystem/alertKinds';
import AlertsSection from './AlertsSection';
import FuelGainForm from './FuelGainForm';
import phrases from './PropTypes';

const AlertsFuelDiff = ({
  translations,
}) => (
  <AlertsSection
    renderForm={(options) => (<FuelGainForm {...options} />)}
    myAlertKind={alertKinds._ALERT_KIND_FUEL_LOSS}
    actionButtonLabel={translations.add_alert}
    headerLabel={translations.fuel_loss_alert.toUpperCase()}
  />
);

AlertsFuelDiff.propTypes = {
  translations: makePhrasesShape(phrases).isRequired,
};


export default pure(translate(phrases)(AlertsFuelDiff));
