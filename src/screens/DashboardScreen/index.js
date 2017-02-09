import React from 'react';
import { isEscape } from 'configs';
import Content from 'components/Content';
import EventsCalculator from 'containers/EventsCalculator';
import FleetSummary from 'containers/FleetSummary';
import WidgetsGroup from './components/WidgetsGroup';
import classes from './classes';

function canShow(Component) {
  if (Component === EventsCalculator) {
    return false && isEscape;
  }

  if (Component === FleetSummary) {
    return true;
  }

  return false;
}

function renderGroup({
  component,
  title,
  className = '',
}) {
  return (
    <WidgetsGroup
      containerClass={className}
      title={title}
    >
      { component }
    </WidgetsGroup>
  );
}

renderGroup.propTypes = {
  component: React.PropTypes.node.isRequired,
  title: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.node,
  ]).isRequired,
  className: React.PropTypes.string,
};

const DashboardScreen = () => (
  <Content>
    { canShow(EventsCalculator) && <EventsCalculator /> }
    { canShow(FleetSummary) && renderGroup({
      component: <FleetSummary />,
      title: 'Fleet Summary',
      className: classes.dashboard__summaryGroup,
    }) }
  </Content>
);

export default DashboardScreen;
