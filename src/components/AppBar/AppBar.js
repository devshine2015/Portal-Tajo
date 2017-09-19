import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import MUIAppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { css } from 'aphrodite/no-important';
import {
  translate,
  makePhrasesShape,
} from 'utils/i18n';
import phrases from './PropTypes';
import classes from './classes';

const STYLES = {
  title: {
    lineHeight: 'inherit',
  },
  right: {
    marginTop: 0,
    display: 'flex',
  },
};

const LogoutButton = ({
  text,
  onClick,
}, { muiTheme }) => (
  <div
    className={css(classes.logoutWrapper)}
    style={{
      backgroundColor: muiTheme.appBar.logoutBackgroundColor,
    }}
  >
    <FlatButton
      label={text}
      onClick={onClick}
      hoverColor="transparent"
      labelStyle={{
        color: muiTheme.appBar.logoutTextColor,
      }}
    />
  </div>
);

LogoutButton.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

LogoutButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

const AppBar = ({
  title,
  toggleSidebar,
  logout,
  translations,
  rightElement,
}, { muiTheme }) => (
  <div className={css(classes.barContainer)}>
    <MUIAppBar
      title={title}
      iconElementRight={(
        <div className={css(classes.rightContainer)}>
          { rightElement }
          <LogoutButton
            text={translations.logout}
            onClick={logout}
          />
        </div>
      )}
      iconStyleRight={STYLES.right}
      titleStyle={STYLES.title}
      zDepth={2}
      style={{
        paddingRight: muiTheme.appBar.paddingRight !== undefined ? muiTheme.appBar.paddingRight : muiTheme.appBar.padding,
        borderBottom: muiTheme.appBar.borderColor ? `1px solid ${muiTheme.appBar.borderColor}` : undefined,
      }}
      onLeftIconButtonTouchTap={toggleSidebar}
    />
  </div>
);

AppBar.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

AppBar.propTypes = {
  title: PropTypes.element.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  translations: makePhrasesShape(phrases).isRequired,
  rightElement: PropTypes.element,
};
AppBar.defaultProps = {
  rightElement: null,
};

const PureAppBar = pure(translate(phrases)(AppBar));

export default PureAppBar;
