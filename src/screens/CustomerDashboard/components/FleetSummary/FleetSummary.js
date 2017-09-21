import React from 'react';
import PropTypes from 'prop-types';
import SimpleSummary from './components/SimpleSummary';
import FullSummary from './components/FullSummary';
import amountsPropType from './PropTypes';

export const FleetSummary = ({
  simple,
  amounts,
}) => (
  simple ?
    <SimpleSummary amounts={amounts} /> :
    <FullSummary amounts={amounts} />
);

FleetSummary.propTypes = {
  // if true will render simplified version
  simple: PropTypes.bool,
  // all of the numbers needed by childrens
  amounts: amountsPropType.isRequired,
};
FleetSummary.defaultProps = {
  simple: false,
};

export default FleetSummary;
