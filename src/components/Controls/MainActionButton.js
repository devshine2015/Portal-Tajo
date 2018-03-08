import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import ContentAddIcon from 'material-ui/svg-icons/content/add';
import { css } from 'aphrodite/no-important';

import classes from './classes';

const DEF_STYLES = {
  icon: {
    width: 17,
    height: 17,
  },
};
// ref={ref !== undefined ? (node) => ref(node) : undefined}

const MainActionButton = ({
  onClick,
  label,
  icon,
  style,
  disabled,
}) => (
  <RaisedButton
    onClick={onClick}
    label={label}
    icon={icon}
    style={Object.assign({}, { float: 'right' }, style)}
    className={css(classes.no_print)}
    primary
    disabled={disabled}
  />
);

MainActionButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.node,
  style: PropTypes.object,
  disabled: PropTypes.bool,
};

MainActionButton.defaultProps = {
  icon: <ContentAddIcon style={DEF_STYLES.icon} />,
  style: undefined,
  disabled: false,
};

export default MainActionButton;
