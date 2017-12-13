import React from 'react';
import pure from 'recompose/pure';
import {
  translate,
  makePhrasesShape,
} from 'utils/i18n';
import * as alertKinds from 'services/AlertsSystem/alertKinds';
import AlertsSection from './AlertsSection';
import TempForm from './TempForm';
import phrases from './PropTypes';

const AlertsTemp = ({
  translations,
}) => (
  <AlertsSection
    renderForm={options => (<TempForm {...options} />)}
    myAlertKind={alertKinds._ALERT_KIND_ENGINE_TEMP}
    actionButtonLabel={translations.add_alert}
    headerLabel={translations.engine_temp_alert.toUpperCase()}
  />
);

AlertsTemp.propTypes = {
  translations: makePhrasesShape(phrases).isRequired,
};

export default pure(translate(phrases)(AlertsTemp));
