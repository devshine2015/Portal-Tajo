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
  backgroundColor: '#ea2224',

};
const SoonCard = {
  backgroundColor: '#cacaca',
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
        {'Next Service Status'}
      </div>
      <div className="row">
        <div className="col-md-4" style={{marginLeft: 15, paddingRight: 0, backgroundColor: '#cacaca', textAlign: 'center', color: 'white'}}>
          <label style={{fontSize: 64}}>{soonCounter.toString()}</label>
        </div>
        <div className="col-md-4" style={{paddingLeft: 0, backgroundColor: '#ea2224', textAlign: 'center', color: 'white'}}>
          <label style={{fontSize: 64}}>{overdueCounter.toString()}</label>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4" style={{paddingRight: 0, textAlign: 'center', color: '#878787'}}>
          <label style={{fontSize: 20, fontWeight: 400}}>{'1000 KM Until Next Service'}</label>
        </div>
        <div className="col-md-4" style={{paddingLeft: 0, textAlign: 'center', color: '#878787'}}>
          <label style={{fontSize: 20, fontWeight: 400}}>{'Due'}</label>
        </div>
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
