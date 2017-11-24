import React from 'react';

// import PortalReports from 'containers/Report';

// export default PortalReports;
import PropTypes from 'prop-types';

import pure from 'recompose/pure';
// import { connect } from 'react-redux';

import Layout from 'components/Layout';
import DashboardElements from 'components/DashboardElements';

import FuelAlerts from './FuelAlerts';

// import { makeMaintenanceData,
//   MaintenanceStatus } from './../utils/maintenanceHelper';


class VehicleMaintenance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  render() {
    if (this.props.theVehicle === null) {
      return false;
    }
    // if (this.state.isLoading) {
    //   // const animation = `transition.flipX${(isFetching ? 'In' : 'Out')}`;      
    //   // animation={animation}
    //   return (
    //     <FixedContent
    //       style={{
    //         padding: 0,
    //         height: '400px',
    //         backgroundColor: 'white',
    //       }}
    //     >
    //       <AnimatedLogo.FullscreenLogo />
    //     </FixedContent>
    //   );
    // }

    // const headLbl = this.state.selectedVehicleId;
    // '6K1577 pajero sport';
    const fuelCap = (this.props.theVehicle.original.fuelCapacity !== undefined
      && this.props.theVehicle.original.fuelCapacity > 0)
      ? this.props.theVehicle.original.fuelCapacity : 'N/A';

    return (
      <Layout.Content style={{ padding: '0' }}>
        <Layout.Section style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
          <DashboardElements.DataCard
            title={'Tank Capacity'}
            dataString={fuelCap}
          />
          <DashboardElements.DataCard
            title={'Total Fuel Concumption'}
            dataString={'350'}
            dataUnits="Ltr"
          />
          <DashboardElements.DataCard
            title={'Liters per KM'}
            dataString={'2.85'}
          />
          <DashboardElements.DataCard
            title={'Total Distance'}
            dataString={'2538'}
            dataUnits="km"
          />
          <DashboardElements.DataCard
            title={'Speed Avg'}
            dataString={'65'}
            dataUnits="km/h"
          />
        </Layout.Section>
        <Layout.Section style={{ padding: '24px' }}>
          <FuelAlerts />
        </Layout.Section>
      </Layout.Content>
    );
  }
}

VehicleMaintenance.propTypes = {
  theVehicle: PropTypes.object,
};

// const mapState = state => ({
// });
// const mapDispatch = {
// };

// export default connect(mapState, mapDispatch)(pure(VehicleMaintenance));
export default pure(VehicleMaintenance);
