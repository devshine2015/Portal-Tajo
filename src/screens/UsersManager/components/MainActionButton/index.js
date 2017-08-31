import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite/no-important';
import RaisedButton from 'material-ui/RaisedButton';
import ContentAddIcon from 'material-ui/svg-icons/content/add';

import classes from './classes';

const DEF_STYLES = {
  icon: {
    width: 17,
    height: 17,
  },
};

const MainActionButton = ({
  onClick,
  label,
  icon,
}) => (
  <RaisedButton
    onTouchTap={onClick}
    label={label}
    className={css(classes.button)}
    icon={icon}
    primary
  />
);

MainActionButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.node,
};

MainActionButton.defaultProps = {
  icon: <ContentAddIcon style={DEF_STYLES.icon} />,
};

export default MainActionButton;
