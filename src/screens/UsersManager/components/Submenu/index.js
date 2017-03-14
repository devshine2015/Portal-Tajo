import React from 'react';
import { css } from 'aphrodite/no-important';
import cs from 'classnames';

import classes from './classes';

const onSubsectionClick = (index, cb) => () => cb(index);

function renderSubsections(opts) {
  return opts.subsections.map((subsec, i) => {
    const liClassName = cs(css(classes.list__item), {
      [css(classes.list__item_active)]: i === opts.activeIndex,
    });

    return (
      <li
        className={liClassName}
        key={i}
      >
        <div className={css(classes.subsection)}>
          <span
            onClick={onSubsectionClick(i, opts.changeSection)}
            className={css(classes.subsection__text)}
          >
            { subsec.label }
          </span>
        </div>
      </li>
    );
  });
}

const Submenu = (props) => (
  <div className={css(classes.submenu)}>
    <ul className={css(classes.list)}>

      { renderSubsections(props) }

    </ul>
  </div>
);

Submenu.propTypes = {
  activeIndex: React.PropTypes.number.isRequired,
  changeSection: React.PropTypes.func.isRequired,
  subsections: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      label: React.PropTypes.string.isRequired,
      value: React.PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Submenu;
