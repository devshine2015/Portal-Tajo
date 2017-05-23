//
// one vehicle report
//
import React from 'react';
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
}) => {
  if (children === null) return false;
  return (<div className={css(classes.no_print)}>
    {children}
  </div>
  );
};

NoPrint.propTypes = {
  children: React.PropTypes.any,
};
NoPrint.defaultProps = {
  children: null,
};

export default pure(NoPrint);
