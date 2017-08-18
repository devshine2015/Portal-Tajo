import React, { PropTypes } from 'react';
import { translate } from 'utils/i18n';
import Widget from 'components/Widget';
import SimpleSummary from './components/SimpleSummary';
import FullSummary from './components/FullSummary';
import amountsPropType from './PropTypes';

const SUMMARY_COMMON_PROPS = {
  // if true will render simplified version
  simple: PropTypes.bool,
  // all of the numbers needed by childrens
  amounts: amountsPropType.isRequired,
};

const SUMMARY_COMMON_DEF_PROPS = {
  simple: false,
};

export const FleetSummary = ({
  simple,
  amounts,
}) => (
  simple ?
    <SimpleSummary amounts={amounts} /> :
    <FullSummary amounts={amounts} />
);

FleetSummary.propTypes = SUMMARY_COMMON_PROPS;
FleetSummary.defaultProps = SUMMARY_COMMON_DEF_PROPS;


/**
 * @desc Wraps FleetSummary into widget
 */
const _FleetSummaryWidget = ({
  containerClass,
  translations,
  ...rest
}) => (
  <Widget
    containerClass={containerClass}
    title={translations.fleet_summary_title}
  >
    <FleetSummary {...rest} />
  </Widget>
);

_FleetSummaryWidget.propTypes = {
  ...SUMMARY_COMMON_PROPS,

  containerClass: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  translations: PropTypes.shape({
    fleet_summary_title: PropTypes.string.isRequired,
  }).isRequired,
};

_FleetSummaryWidget.defaultProps = {
  ...SUMMARY_COMMON_DEF_PROPS,

  containerClass: {},
};

export const FleetSummaryWidget = translate(['fleet_summary_title'])(_FleetSummaryWidget);
