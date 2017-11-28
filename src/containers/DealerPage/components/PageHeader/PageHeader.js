import React from 'react';
import PropTypes from 'prop-types';
import { css, StyleSheet } from 'aphrodite/no-important';
import FlatButton from 'material-ui/FlatButton';
import tinycolor from 'tinycolor2';

import { DateRangeWithButton } from 'components/DateRange';
import { theme } from 'configs';


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
    fontSize: 20,
    fontWeight: 'normal',
    lineHeight: '100%',
    padding: '5px 0px',
    color: tinycolor(theme.layout.headerColor).setAlpha(0.45).toString(),
  },
  actions: {
  },
});

const PageHeader = ({ text, onApply, hasDateSelector }) => (
  <div className={css(classes.header)}>
    <div className={css(classes.text)}>
      { text }
    </div>
    {hasDateSelector && <div className={css(classes.actions)}>
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
    </div>}
  </div>
);

PageHeader.propTypes = {
  text: PropTypes.string.isRequired,
  onApply: PropTypes.func.isRequired,
  hasDateSelector: PropTypes.bool,
};

PageHeader.defaultProps = {
  hasDateSelector: true,
};


export default PageHeader;
