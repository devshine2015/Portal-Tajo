/*import React from 'react';
import { css } from 'aphrodite/no-important';
import classes from './classes';

function getStyles(propsStyles, context) {
  // const { disabled } = props;
  // const spacing = context.muiTheme.baseTheme.spacing;
  // const palette = context.muiTheme.baseTheme.palette;
  // const accentColor = context.muiTheme.dropDownMenu.accentColor;
  return {
    header: { padding: '0 4px',
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      color: 'rgba(0, 0, 0, 0.54)',
      border: 'solid 1px rgba(0, 0, 0, 0.15)' },
      //fontSize: 16,
      //lineHeight: 24,
      //height: 24,
  };
}

const Header = ({
  label,
  style,
}) => (
  <div
    style={getStyles(style).header}
  >
    {label}
  </div>
);

Header.propTypes = {
  label: React.PropTypes.string.isRequired,
  style: React.PropTypes.object,
};

Header.defaultProps = {
  style: null,
};
export default Header;*/


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
