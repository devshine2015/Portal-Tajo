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
    position: 'absolute',
    top: '20px',
    right: '0',
  },
});

const PageHeader = ({ text, subHeader, onApply, hasDateSelector }) => (
  <div className={css(classes.header)}>
    <div className={css(classes.text)}>
      { text }
    </div>
    <div className={css(classes.text)}>
      {subHeader}
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
  subHeader: PropTypes.string,
};

PageHeader.defaultProps = {
  hasDateSelector: true,
  subHeader: '',
};


export default PageHeader;
