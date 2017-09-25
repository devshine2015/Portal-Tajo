import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite/no-important';
import WarningIcon from 'material-ui/svg-icons/alert/warning';
import Layout from 'components/Layout';
import classes from './classes';

const DefaultPlaceholderText = () => (
  <div className={css(classes.defaultText)}>
    <WarningIcon
      color="#ccc"
      style={{
        width: 80,
        height: 80,
      }}
    /><br />
    There is nothing to show yet.<br />
    Select fleet you want to monitor to start work.
  </div>
);

const Placeholder = ({
  children,
}) => {
  return (
    <Layout.Content center>
      <div className={css(classes.placeholder)}>
        {children || <DefaultPlaceholderText />}
      </div>
    </Layout.Content>
  );
};

Placeholder.propTypes = {
  children: PropTypes.node,
};

Placeholder.defaultProps = {
  children: null,
};

export default Placeholder;
