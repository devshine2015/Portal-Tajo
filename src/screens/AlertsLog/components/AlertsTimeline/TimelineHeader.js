import React from 'react';
import { css } from 'aphrodite/no-important';
import classes from './TimelineHeader.classes';

const DEFAULT_TIME_RANGE_TEXT = 'last 24 hours';

const dateShape = {
  from: React.PropTypes.string,
  to: React.PropTypes.string,
};

const HighlitedText = ({ children }) =>
  <span className={css(classes.header__sub_highlighted)}>{ children }</span>;

HighlitedText.propTypes = {
  children: React.PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
};


const PeriodText = ({ dateRange, isDefaultRange }) => {
  let Text;

  if (isDefaultRange) {
    Text = () => <HighlitedText>{ DEFAULT_TIME_RANGE_TEXT }</HighlitedText>;
  } else {
    Text = () => (
      <span>
        the period from <HighlitedText>{dateRange.from}</HighlitedText> to <HighlitedText>{dateRange.to}</HighlitedText>
      </span>
    );
  }

  return <Text />;
};

PeriodText.propTypes = {
  isDefaultRange: React.PropTypes.bool.isRequired,
  dateRange: React.PropTypes.shape(dateShape).isRequired,
};


const Header = ({
  ...rest,
  totalAmount,
  filteredAmount,
  isFiltered,
}) => (
  <div className={css(classes.header)}>
    <h3 className={css(classes.header__main)}>Historical Timeline</h3>
    <p>Total <HighlitedText>{totalAmount}</HighlitedText> events for <PeriodText {...rest} /></p>
    { isFiltered && (
      <p className={css(classes.header__sub)}>
        Showing <HighlitedText>{filteredAmount}</HighlitedText> filtered events
      </p>
    )}
  </div>
);

Header.propTypes = {
  totalAmount: React.PropTypes.number.isRequired,
  filteredAmount: React.PropTypes.number,
  isDefaultRange: React.PropTypes.bool.isRequired,
  isFiltered: React.PropTypes.bool.isRequired,
  dateRange: React.PropTypes.shape(dateShape),
};

Header.defaultTypes = {
  dateRange: undefined,
};

export default Header;
