import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite/no-important';

import Avatar from 'material-ui/Avatar';
import tinycolor from 'tinycolor2';
import { theme } from 'configs';
import classes from './classes';

const ActionWrapper = ({ children }) => (
  <div className={css(classes.header__actionWrapper)}>
    { children }
  </div>
);

ActionWrapper.propTypes = {
  children: PropTypes.element.isRequired,
};
// backgroundColor={context.muiTheme.palette.primary1Color}

const Header = ({
  icon,
  label,
  action,
  style,
  labelStyle,
}) => (
  <div className={css(classes.header)} style={style}>
    <h3 className={css(classes.header__content)}>
      { icon !== undefined &&
        <Avatar
          color="#fff"
          backgroundColor={tinycolor(theme.layout.headerColor).setAlpha(0.6).toString()}
          icon={icon}
          className={css(classes.header__icon)}
        />
      }
      <span className={css(classes.header__text)} style={labelStyle}>{ label }</span>
    </h3>
    { action && <ActionWrapper>{action}</ActionWrapper> }
  </div>
);

Header.propTypes = {
  icon: PropTypes.element,
  label: PropTypes.string,
  action: PropTypes.node,
  style: PropTypes.object,
  labelStyle: PropTypes.object,
};

Header.defaultProps = {
  icon: undefined,
  label: '',
  action: undefined,
  style: {},
  labelStyle: {},
};

export default Header;
