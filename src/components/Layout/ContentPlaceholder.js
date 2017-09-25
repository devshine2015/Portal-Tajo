import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite/no-important';
import WarningIcon from 'material-ui/svg-icons/alert/warning';
import Content from './Content';
import { placeholderClasses } from './classes';

const DefaultPlaceholderText = () => (
  <div className={css(placeholderClasses.defaultText)}>
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

const ContentPlaceholder = ({
  children,
}) => {
  return (
    <Content center>
      <div className={css(placeholderClasses.placeholder)}>
        {children || <DefaultPlaceholderText />}
      </div>
    </Content>
  );
};

ContentPlaceholder.propTypes = {
  children: PropTypes.node,
};

ContentPlaceholder.defaultProps = {
  children: null,
};

export default ContentPlaceholder;
