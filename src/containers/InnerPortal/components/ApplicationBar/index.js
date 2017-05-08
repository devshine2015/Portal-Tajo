import React from 'react';
import pure from 'recompose/pure';
import { withRouter } from 'react-router';
import locationShape from 'react-router/lib/PropTypes';
import { connect } from 'react-redux';
import { AppBar, FlatButton } from 'material-ui';
import { BASE_URL, isEscape, isMwa } from 'configs';
import endpoints from 'configs/endpoints';
import CodebaseVersion from 'components/CodebaseVersion';
import { changeMainSidebarState } from 'containers/InnerPortal/actions';
// import FleetSummary from 'containers/FleetSummary';
// import JournalToggle from 'containers/Journal/components/JournalToggle';
import JournalIndicatorBtn from 'containers/Journal/components/JournalIndicatorBtn';
import { translate } from 'utils/i18n';

import mwaLogo from 'assets/images/logos/mwa/mwa.png';

import styles from './styles.css';
import phrases, { phrasesShape } from './PropTypes';

const hideSummaryOn = [
  `${BASE_URL}review`,
  `${BASE_URL}dashboard`,
  isEscape && BASE_URL,
];

const STYLES = {
  title: {
    lineHeight: 'inherit',
  },
};

function renderSummary(location) {
  const hide = hideSummaryOn.indexOf(location.pathname) !== -1;

  if (hide) {
    return null;
  }

  return (
    <div className={styles.rightContainer}>
      {/*<FleetSummary simple />*/}
      <JournalIndicatorBtn />
    </div>
  );
}

function renderTitle(title) {
  if (isMwa) {
    return (
      <div className={styles.title}>
        {/*<img src={mwaLogo} alt="mwa logo" height="60" width="184" />*/}
        <img src={mwaLogo} alt="mwa logo" height="60" width="76" />
      </div>
    );
  }
  return (
    <div className={styles.title}>
      { title }
      <CodebaseVersion />
    </div>
  );
}

const _onLogoutClick = cb => () => cb(endpoints.logout);

const ApplicationBar = ({
  title,
  toggleSidebar,
  location,
  translations,
}, {
  logout,
}) => (
  <div className={styles.barContainer}>
    <AppBar
      title={renderTitle(title)}
      iconElementRight={
        <FlatButton
          label={ translations.logout }
          onClick={_onLogoutClick(logout)}
        />
      }
      titleStyle={STYLES.title}
      className={styles.bar}
      zDepth={0}
      onLeftIconButtonTouchTap={toggleSidebar}
      children={ renderSummary(location) }
    />
  </div>
);

ApplicationBar.contextTypes = {
  logout: React.PropTypes.func.isRequired,
};

ApplicationBar.propTypes = {
  title: React.PropTypes.string.isRequired,
  toggleSidebar: React.PropTypes.func.isRequired,
  location: React.PropTypes.shape(locationShape).isRequired,

  translations: phrasesShape.isRequired,
};
ApplicationBar.defaultProps = {
  translations: phrases,
};

const mapState = null;
const mapDispatch = {
  toggleSidebar: changeMainSidebarState,
};

const PureApplicationBar = pure(withRouter(ApplicationBar));

const Connected = connect(mapState, mapDispatch)(PureApplicationBar);

export default translate(phrases)(Connected);
