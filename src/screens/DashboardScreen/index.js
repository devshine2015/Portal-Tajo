import React from 'react';
import Content from 'components/Content';
import Widget from 'components/Widget';
import FleetSummary from 'containers/FleetSummary';
import { onProduction, onStage } from 'configs';
import { translate } from 'utils/i18n';
import D3Sandbox from './components/Sandbox';

import RunningLogo from 'components/animated/RunningLogo';

import classes from './classes';
import phrases, { phrasesShape } from './PropTypes';

function canShow(Component) {
  if (Component === FleetSummary) {
    return true;
  }

  if ((Component === D3Sandbox) && !onProduction && !onStage) {
    return true;
  }

  if ((Component === RunningLogo) && !onProduction && !onStage) {
    return true;
  }

  return false;
}

const logoContainerStyle = {flex: '1' };

const DashboardScreen = ({ translations }) => (
  <Content center>
    { canShow(RunningLogo) &&
      <div style={{ display: 'flex', flexDirection: 'row', margin: '60px 40px 20px 40px', width: '100%' }}>
        <div style={logoContainerStyle}>
          <RunningLogo radius={60} color="darkorange" swayRange={20} />
        </div>
        <div style={logoContainerStyle}>
          <RunningLogo radius={60} color="darkorange" swayRange={10} turnRange={10} is3D />
        </div>
        <div style={logoContainerStyle}>
          <RunningLogo radius={20} swayRange={10} />
        </div>
        </div>
      }
    { canShow(RunningLogo) &&
      <div style={{ display: 'inline-flex', marginTop: '140px', marginBottom: '160px' }}>
        <div style={{ paddingRight: '5px', position: 'relative', top: '2px' }}>
          <RunningLogo radius={10} color="#009688" />
        </div>
        <div style={{ padding: '0', color: '#009688' }}>
            loading...
          </div>
        </div>
      }

    { canShow(FleetSummary) && (
      <Widget
        containerClass={classes.dashboard__summaryGroup}
        title={ translations.fleet_summary_title }
      >
        <FleetSummary />
      </Widget>
    )}
    { canShow(D3Sandbox) && <D3Sandbox /> }

  </Content>
);

DashboardScreen.propTypes = {
  translations: phrasesShape.isRequired,
};

DashboardScreen.displayName = 'DashboardScreen';
DashboardScreen.defaultProps = {
  translations: phrases,
};

export default translate()(DashboardScreen);
