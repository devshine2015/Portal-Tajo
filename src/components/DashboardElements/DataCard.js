import React from 'react';

//
//
import PropTypes from 'prop-types';

import pure from 'recompose/pure';

import { css } from 'aphrodite/no-important';
import classes from './classes';

// import classes from './classes';

// SubCard can not exist without a dataCard - so its here
const SubCard = ({
  title,
  dataString,
  style,
}) => {
  const className = css(classes.dataItemValueContainer, classes.subCard);
  return (
    <div className={className} style={style}>
      <div className={css(classes.dataItemValueContainer, classes.subCardValue)} >
        <div className={css(classes.dataItemValue)}>{dataString}</div>
      </div>
      <div className={css(classes.dataItemTitle, classes.subCardTitle)}>
        {title}
      </div>
    </div>
  );
};

SubCard.propTypes = {
  title: PropTypes.string.isRequired,
  dataString: PropTypes.string.isRequired,
  style: PropTypes.object,
};


const DataCard = ({
  title,
  dataString,
  dataUnits,
  // style,
}) => {
  // const className = cs(css(classes.progBarBody));
  // const containerStyle = Object.assign({}, maxWidth !== undefined ? { maxWidth } : {}, style);
  // style={{ width: witdhPerc }} 
  return (
    <div className={css(classes.itemBox, classes.itemBody)}>
      <div className={css(classes.dataItemTitle)}>
        {title}
      </div>
      <div className={css(classes.dataItemValueContainer)} >
        <span className={css(classes.dataItemValue)}>{dataString}</span>
        { dataUnits !== undefined && <span className={css(classes.dataItemUnits)}>{dataUnits}</span>}
      </div>
    </div>
  );
};

DataCard.propTypes = {
  title: PropTypes.string.isRequired,
  dataString: PropTypes.string.isRequired,
  dataUnits: PropTypes.string,
  // style: PropTypes.object,
};

DataCard.defaultProps = {
  dataUnits: undefined,
  style: undefined,
};

export default pure(DataCard);
export const PureSubCard = pure(SubCard);

