import React from 'react';
import { css } from 'aphrodite/no-important';
import FlatButton from 'material-ui/FlatButton';
import endpoints from 'configs/endpoints';
import { translate } from 'utils/i18n';
import Journal from '../Journal/Journal';
import phrases, { phrasesShape } from './PropTypes';
import classes from './classes';

const _onLogoutClick = cb => () => cb(endpoints.logout);

const STYLES = {
  logoutLabel: {
    color: '#fff',
  },
};

const AppBarRightElement = (props, context) => {
  return (
    <div className={css(classes.rightElement)}>
      <Journal />
      <FlatButton
        label={props.translations.logout}
        onClick={_onLogoutClick(context.logout)}
        hoverColor="transparent"
        labelStyle={STYLES.logoutLabel}
      />
    </div>
  );
};

AppBarRightElement.contextTypes = {
  logout: React.PropTypes.func.isRequired,
};

AppBarRightElement.propTypes = {
  translations: phrasesShape.isRequired,
};

AppBarRightElement.defaultProps = {
  translations: phrases,
};

export default translate(phrases)(AppBarRightElement);
