import React from 'react';
import pure from 'recompose/pure';
import {
  translate,
  makePhrasesShape,
} from 'utils/i18n';
import * as alertKinds from 'services/AlertsSystem/alertKinds';
import AlertsSection from './AlertsSection';
import TimeForm from './TimeForm';
import phrases from './PropTypes';

const AlertsDriveTime = ({
  translations,
}) => (
  <AlertsSection
    renderForm={(options) => (<TimeForm {...options} />)}
    myAlertKind={alertKinds._ALERT_KIND_DRIVE_TIME}
    actionButtonLabel={translations.add_alert}
    headerLabel={translations.drive_time.toUpperCase()}
  />
);

AlertsDriveTime.propTypes = {
  translations: makePhrasesShape(phrases).isRequired,
};

export default pure(translate(phrases)(AlertsDriveTime));
