import React from 'react';
import { css } from 'aphrodite/no-important';

import Avatar from 'material-ui/Avatar';
import classes from './classes';

const ActionWrapper = ({ children }) => (
  <div className={css(classes.header__actionWrapper)}>
    { children }
  </div>
);

ActionWrapper.propTypes = {
  children: React.PropTypes.element.isRequired,
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
          backgroundColor="rgba(0, 150, 136, 0.60)"
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
  icon: React.PropTypes.element,
  label: React.PropTypes.string,
  action: React.PropTypes.node,
  style: React.PropTypes.object,
  labelStyle: React.PropTypes.object,
};

Header.defaultProps = {
  icon: undefined,
  label: '',
  action: undefined,
  style: {},
  labelStyle: {},
};

export default Header;
