import { connect } from 'react-redux';
import { getDevicesAmount } from 'services/Devices/reducer';
import { getAmounts } from 'services/FleetModel/reducer';
import {
  FleetSummary,
  FleetSummaryWidget,
} from './FleetSummary';

const mapState = state => ({
  amounts: {
    ...getAmounts(state),
    devicesAmount: getDevicesAmount(state),
  },
});

export const fleetSummaryBase = connect(mapState, null)(FleetSummary);
export const fleetSummaryWidget = connect(mapState, null)(FleetSummaryWidget);
