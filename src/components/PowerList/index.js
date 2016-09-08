import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import { gfEditIsEditing } from 'containers/GFEditor/reducer';

import GFEditPanel from 'containers/GFEditor';

import classnames from 'classnames';
import FixedColumn from 'components/FixedColumn';
import Scrollable from 'components/Scrollable';

import styles from './styles.css';

function renderChildrens(scrollable, filter, content) {
  const result = [];

  if (filter) {
    result.push(React.cloneElement(filter, {
      key: 'filter',
    }));
  }

  if (scrollable && content) {
    result.push(
      <Scrollable key="scrollable">
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
  children = null,
  className,
  content = null,
  filter = null,
  fixed = true,
  scrollable = true,
  isEditGF = false,
}) => {
  const columnClassName = classnames(styles.columnContainer, className, {
    [styles.likeStatic]: !fixed,
  });
  const toDisplay = isEditGF ?
            (<GFEditPanel />)
            : (children || renderChildrens(scrollable, filter, content));
  return (
    <FixedColumn containerClassName={columnClassName}>
      <div className={styles.powerlist}>
        { toDisplay }
      </div>
    </FixedColumn>
  );
};

PowerList.propTypes = {
  children: React.PropTypes.element,
  className: React.PropTypes.string,
  content: React.PropTypes.element,
  filter: React.PropTypes.element,
  fixed: React.PropTypes.bool,
  scrollable: React.PropTypes.bool,
  isEditGF: React.PropTypes.bool.isRequired,
};
const mapState = (state) => ({
  isEditGF: gfEditIsEditing(state),
});

const PurePowerList = pure(PowerList);
export default connect(mapState)(PurePowerList);
