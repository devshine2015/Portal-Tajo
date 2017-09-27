import React from 'react';
import PropTypes from 'prop-types';
import { css, StyleSheet } from 'aphrodite/no-important';

const classes = StyleSheet.create({
  header: {
    fontSize: 26,
    fontWeight: 400,
    padding: '20px 40px',
    backgroundColor: '#fff',
    borderBottom: '1px solid rgba(0, 0, 0, 0.07)',
    lineHeight: '100%',
    margin: '0 -20px 20px',
  },
});

const PageHeader = ({ text }) => (
  <div className={css(classes.header)}>
    { text }
  </div>
);

PageHeader.propTypes = {
  text: PropTypes.string.isRequired,
};

export default PageHeader;
