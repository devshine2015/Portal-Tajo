import React from 'react';

//
//
import PropTypes from 'prop-types';

import pure from 'recompose/pure';

import { css } from 'aphrodite/no-important';
import classes from './classes';

// import classes from './classes';

const DataCard = ({
  title,
  dataString,
  style,
}) => {
  // const className = cs(css(classes.progBarBody));
  // const containerStyle = Object.assign({}, maxWidth !== undefined ? { maxWidth } : {}, style);
  // style={{ width: witdhPerc }} 
  return (
    <div className={css(classes.dataItemContainer)}>
      <div className={css(classes.dataItemTitle)}>
        {title}
      </div>
      <div className={css(classes.dataItemValueContainer)} >
        {dataString}
      </div>
    </div>
  );
};

DataCard.propTypes = {
  title: PropTypes.string.isRequired,
  dataString: PropTypes.number.isRequired,
  style: PropTypes.object,
};

export default pure(DataCard);
