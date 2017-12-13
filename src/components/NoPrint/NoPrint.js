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
});

const NoPrint = ({
  children,
  style,
}) => {
  if (children === null) return false;
  return (<div className={css(classes.no_print)} style={style}>
    {children}
  </div>
  );
};

NoPrint.propTypes = {
  children: PropTypes.any,
  style: PropTypes.object,
};
NoPrint.defaultProps = {
  children: null,
  style: {},
};

export default pure(NoPrint);
