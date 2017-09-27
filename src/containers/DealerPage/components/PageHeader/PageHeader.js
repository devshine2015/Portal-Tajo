import React from 'react';
import PropTypes from 'prop-types';
import { css, StyleSheet } from 'aphrodite/no-important';
import FlatButton from 'material-ui/FlatButton';
import { DateRangeWithButton } from 'components/DateRange';


const classes = StyleSheet.create({
  header: {
    padding: '20px 40px',
    backgroundColor: '#fff',
    borderBottom: '1px solid rgba(0, 0, 0, 0.07)',
    margin: '0 -20px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexShrink: 0,
  },
  text: {
    fontSize: 26,
    fontWeight: 400,
    lineHeight: '100%',
  },
  actions: {

  },
});

const PageHeader = ({ text, onApply }) => (
  <div className={css(classes.header)}>
    <div className={css(classes.text)}>
      { text }
    </div>
    <div className={css(classes.actions)}>
      <DateRangeWithButton
        withTime={false}
        onApply={onApply}
        button={(
          <FlatButton
            primary
            label="apply"
          />
        )}
      />
    </div>
  </div>
);

PageHeader.propTypes = {
  text: PropTypes.string.isRequired,
  onApply: PropTypes.func.isRequired,
};

export default PageHeader;
