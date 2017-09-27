import React from 'react';
import pure from 'recompose/pure';
import {
  translate,
  makePhrasesShape,
} from 'utils/i18n';
import * as alertKinds from 'services/AlertsSystem/alertKinds';
import AlertsSection from './AlertsSection';
import FuelForm from './FuelForm';
import phrases from './PropTypes';

const AlertsFuelDiff = ({
  translations,
}) => (
  <AlertsSection
    renderForm={(options) => (<FuelForm {...options} />)}
    myAlertKind={alertKinds._ALERT_KIND_FUEL_DIFF}
    actionButtonLabel={translations.add_alert}
    headerLabel={translations.fuel_alert.toUpperCase()}
  />
);

AlertsFuelDiff.propTypes = {
  translations: makePhrasesShape(phrases).isRequired,
};


export default pure(translate(phrases)(AlertsFuelDiff));
