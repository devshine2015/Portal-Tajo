import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import classnames from 'classnames';
import FixedColumn from 'components/FixedColumn';
import Scrollable from 'components/Scrollable';

import styles from './styles.css';

function renderChildrens(scrollable, filter, content, options = {}) {
  const result = [];

  if (filter) {
    result.push(React.cloneElement(filter, {
      key: 'filter',
    }));
  }

  if (scrollable && content) {
    result.push(
      <Scrollable
        key="scrollable"
        offsetTop={options.offsetTop}
      >
        {content}
      </Scrollable>
    );
  } else if (content) {
    result.push(React.cloneElement(content, {
      key: 'content',
    }));
  }

  return result;
}

const PowerList = ({
  children,
  className,
  content,
  filter,
  fixed,
  scrollable,
  offsetTop,
}, { muiTheme }) => {
  const columnClassName = classnames(styles.columnContainer, className, {
    [styles.likeStatic]: !fixed,
  });
  // display children as is on apply options
  const toDisplay = children || renderChildrens(scrollable, filter, content, {
    offsetTop,
  });

  return (
    <FixedColumn containerClassName={columnClassName}>
      <div
        className={styles.powerlist}
        style={{
          backgroundColor: muiTheme.powerList.backgroundColor,
        }}
      >
        { toDisplay }
      </div>
    </FixedColumn>
  );
};

PowerList.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

PowerList.propTypes = {
  children: PropTypes.element,
  className: PropTypes.string,
  content: PropTypes.element,
  filter: PropTypes.element,
  fixed: PropTypes.bool,
  scrollable: PropTypes.bool,
  offsetTop: PropTypes.number,
};

PowerList.defaultProps = {
  children: null,
  className: '',
  content: null,
  filter: null,
  fixed: true,
  scrollable: true,
  offsetTop: undefined,
};

export default pure(PowerList);

