import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import { css } from 'aphrodite/no-important';
import classes from './classes';


const DetailItemProperty = ({
  title,
  icon,
  value,
}) => (
  <div className={css(classes.propContainer)}>
    <span className={css(classes.titleCell)}>
      {title === '' ? icon : `${title}:`}
    </span>
    <span className={css(classes.valueCell)}>
      {value}
    </span>
  </div>
);

DetailItemProperty.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};
DetailItemProperty.defaultProps = {
  icon: null,
  title: '',
};

export default pure(DetailItemProperty);
