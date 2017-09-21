import { connect } from 'react-redux';
import { getDevicesAmount } from 'services/Devices/reducer';
import { getAmounts } from 'services/FleetModel/reducer';
import _FleetSummary from './FleetSummary';

const mapState = state => ({
  amounts: {
    ...getAmounts(state),
    devicesAmount: getDevicesAmount(state),
  },
});

export default connect(mapState, null)(_FleetSummary);
