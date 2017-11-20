import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { css } from 'aphrodite/no-important';

import { getVehiclesEx } from 'services/FleetModel/reducer';
import localAlertsProcessor from 'services/AlertsSystem/utils/localAlertsProcessor';
import * as alertKinds from 'services/AlertsSystem/alertKinds';

//
//
// import PropTypes from 'prop-types';

import pure from 'recompose/pure';

import { theme } from 'configs';

import DashboardElements from 'components/DashboardElements';

import classes from 'components/DashboardElements/classes';

// import classes from './classes';

const OverdueCard = {
  backgroundColor: theme.palette.alertColor,
};
const SoonCard = {
  backgroundColor: theme.palette.warningColor,
};

const ServiceOverview = (vehicles) => {
  const classNameParent = css(classes.itemBody, classes.subCardsContainer);

  let soonCounter = 0;
  let overdueCounter = 0;
  vehicles.vehicles.forEach((aVeh) => { 
    const aState = localAlertsProcessor.getVehicleAlertState(aVeh);
    soonCounter += localAlertsProcessor.isAlertStateHasWarning(aState, alertKinds._ALERT_KIND_ODO) ? 1 : 0;
    overdueCounter += localAlertsProcessor.isAlertStateHasAlert(aState, alertKinds._ALERT_KIND_ODO) ? 1 : 0;
  } );

  return (
    <div className={css(classes.itemBox)}>
      <div className={css(classes.dataItemTitleDark)}>
        {'Next Service Overview'}
      </div>
      <div className={classNameParent}>
        <DashboardElements.SubCard title={'coming soon'} dataString={soonCounter.toString()} style={SoonCard} />
        <DashboardElements.SubCard title={'overdue'} dataString={overdueCounter.toString()} style={OverdueCard} />
      </div>
    </div>
  );
};

ServiceOverview.propTypes = {
  vehicles: PropTypes.array.isRequired,
};

const mapState = state => ({
  vehicles: getVehiclesEx(state),
  // gfById: getGFByIdFunc(state),
});
const mapDispatch = {
  // mwaSelectJob,
  // selectVehicle: contextActions.ctxSelectVehicle,
  // mapStoreSetPan,
};
export default connect(mapState, mapDispatch)(pure(ServiceOverview));
