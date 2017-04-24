import React from 'react';
import { css } from 'aphrodite/no-important';

import classes from './classes';

const ActionWrapper = ({ children }) => (
  <div className={css(classes.actionWrapper)}>
    { children }
  </div>
);

ActionWrapper.propTypes = {
  children: React.PropTypes.any.isRequired,
};

const SectionHeader = ({
  label,
  action,
}) => (
  <div className={css(classes.header)}>
    <h3 className={css(classes.header__text)}>
      { label }
    </h3>
    { action && <ActionWrapper>{action}</ActionWrapper> }
  </div>
);

SectionHeader.propTypes = {
  label: React.PropTypes.string,
  action: React.PropTypes.node,
};

SectionHeader.defaultProps = {
  label: '',
  action: undefined,
};

export default SectionHeader;
