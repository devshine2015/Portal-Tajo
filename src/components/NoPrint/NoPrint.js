import React from 'react';

//
// one vehicle report
//
import PropTypes from 'prop-types';

import pure from 'recompose/pure';
import { StyleSheet, css } from 'aphrodite/no-important';

const classes = StyleSheet.create({
  no_print: {
    '@media print': {
      display: 'none !important',
    },
  },
  no_screen: {
    '@media screen': {
      display: 'none !important',
    },
  },
});

const NoPrint = ({
  children,
  style,
  onlyPrint,
}) => {
  if (children === null) return false;
  const classN = onlyPrint ? css(classes.no_screen) : css(classes.no_print);
  return (<div className={classN} style={style}>
    {children}
  </div>
  );
};

NoPrint.propTypes = {
  children: PropTypes.any,
  style: PropTypes.object,
  onlyPrint: PropTypes.bool,
};
NoPrint.defaultProps = {
  children: null,
  style: {},
  onlyPrint: false,
};

export default pure(NoPrint);
