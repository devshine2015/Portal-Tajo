import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite/no-important';
import FlatButton from 'material-ui/FlatButton';
import { translate } from 'utils/i18n';
import Journal from '../Journal';
import phrases, { phrasesShape } from './PropTypes';
import classes from './classes';

const STYLES = {
  logoutLabel: {
    color: '#fff',
  },
};

const onLogoutClick = (props, context) => () => context.logout(props.accessToken);

const AppBarRightElement = (props, context) => {
  return (
    <div className={css(classes.rightElement)}>
      <Journal />
      <FlatButton
        label={props.translations.logout}
        onClick={onLogoutClick(props, context)}
        hoverColor="transparent"
        labelStyle={STYLES.logoutLabel}
      />
    </div>
  );
};

AppBarRightElement.contextTypes = {
  logout: PropTypes.func.isRequired,
};

AppBarRightElement.propTypes = {
  translations: phrasesShape.isRequired,
  accessToken: React.PropTypes.string.isRequired,
};

AppBarRightElement.defaultProps = {
  translations: phrases,
};

export default translate(phrases)(AppBarRightElement);
