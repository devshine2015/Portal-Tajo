import React from 'react';
import { connect } from 'react-redux';
import pure from 'recompose/pure';
import SimpleSummary from './components/SimpleSummary';
import FullSummary from './components/FullSummary';
import { getDevicesAmount } from 'services/Devices/reducer';
import { getAmounts } from 'services/FleetModel/reducer';
import { amountsShape } from './PropTypes';

const FleetSummary = ({
  simple,
  amounts,
}) => (
  simple ?
    <SimpleSummary amounts={amounts} /> :
    <FullSummary amounts={amounts} />
);

FleetSummary.propTypes = {
  // if true will render simlified version
  // of the summary
  simple: React.PropTypes.bool,

  // all of the numbers needed by childrens
  amounts: amountsShape.isRequired,
};

FleetSummary.defaultProps = {
  simple: false,
};

const mapState = state => ({
  amounts: {
    ...getAmounts(state),
    devicesAmount: getDevicesAmount(state),
  },
});

const PureFleetSummary = pure(FleetSummary);

export default connect(mapState, null)(PureFleetSummary);
