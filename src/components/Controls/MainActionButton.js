import React from 'react';
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
}) => (
  <RaisedButton
    onTouchTap={onClick}
    label={label}
    icon={icon}
    style={{ float: 'right' }}
    className={css(classes.no_print)}
    primary
  />
);

MainActionButton.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  label: React.PropTypes.string.isRequired,
  icon: React.PropTypes.node,
};

MainActionButton.defaultProps = {
  icon: <ContentAddIcon style={DEF_STYLES.icon} />,
};

export default MainActionButton;
