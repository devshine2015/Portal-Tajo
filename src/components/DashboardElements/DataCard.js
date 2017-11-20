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
      <div style={{fontSize: 20, fontWeight: 400}}> 
        {dataString}
      </div>
      <div style={{fontSize: 30, fontWeight: 'bold'}}>
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
  unit,
  style,
}) => {
  // const className = cs(css(classes.progBarBody));
  // const containerStyle = Object.assign({}, maxWidth !== undefined ? { maxWidth } : {}, style);
  // style={{ width: witdhPerc }} 
  return (
    <div className={css(classes.itemBox, classes.itemBody)} style={{padding: 18, borderRadius: 5}}>
      <div className={css(classes.dataItemTitle)} style={{fontSize: 20}}>
        {title}
      </div>
      <div className={css(classes.dataItemValueContainer)} style={{fontSize: 50, letterSpacing: 3}} >
        {dataString}<label style={{fontSize: 15}}>{unit}</label>
      </div>
    </div>
  );
};

DataCard.propTypes = {
  title: PropTypes.string.isRequired,
  dataString: PropTypes.string.isRequired,
  style: PropTypes.object,
};

export default pure(DataCard);
export const PureSubCard = pure(SubCard);

