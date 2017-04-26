import React from 'react';
import { css } from 'aphrodite/no-important';

import Avatar from 'material-ui/Avatar';
import classes from './classes';

const ActionWrapper = ({ children }) => (
  <div className={css(classes.actionWrapper)}>
    { children }
  </div>
);

ActionWrapper.propTypes = {
  children: React.PropTypes.any.isRequired,
};
      // backgroundColor={context.muiTheme.palette.primary1Color}

const SectionHeader = ({
  icon,
  label,
  action,
}) => (
  <div className={css(classes.header)}>
    <h3 className={css(classes.header__content)}>
      <Avatar
        color="#fff"
        backgroundColor="rgba(0, 150, 136, 0.60)"
        icon={icon}
      />
      <span className={css(classes.header__text)} >{ label }</span>
    </h3>
    { action && <ActionWrapper>{action}</ActionWrapper> }
  </div>
);

SectionHeader.propTypes = {
  icon: React.PropTypes.object,
  label: React.PropTypes.string,
  action: React.PropTypes.node,
};

SectionHeader.defaultProps = {
  label: '',
  action: undefined,
};

export default SectionHeader;
