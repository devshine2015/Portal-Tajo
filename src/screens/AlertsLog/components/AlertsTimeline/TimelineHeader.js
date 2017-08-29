import React, { PropTypes } from 'react';
import { css } from 'aphrodite/no-important';
import {
  translate,
  makePhrasesShape,
} from 'utils/i18n';
import phrases from '../../PropTYpes';
import classes from './TimelineHeader.classes';

const dateShape = {
  from: PropTypes.string,
  to: PropTypes.string,
};

const HighlitedText = ({ children }) =>
  <span className={css(classes.header__sub_highlighted)}>{ children }</span>;

HighlitedText.propTypes = {
  children: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
};


const PeriodText = ({ dateRange, isDefaultRange, translations }) => {
  let Text;

  if (isDefaultRange) {
    Text = () => <HighlitedText>{ translations.for_last_24_hours }</HighlitedText>;
  } else {
    Text = () => (
      <span>
        {translations.from} <HighlitedText>{dateRange.from}</HighlitedText> {translations.to} <HighlitedText>{dateRange.to}</HighlitedText>
      </span>
    );
  }

  return <Text />;
};

PeriodText.propTypes = {
  isDefaultRange: PropTypes.bool.isRequired,
  dateRange: PropTypes.shape(dateShape).isRequired,
  translations: makePhrasesShape(phrases).isRequired,
};


const HeaderTitle = ({ vehicleName, translations }) => (
  <h3 className={css(classes.header__main)}>
    { translations.historical_timeline }
    <br />
    { vehicleName && vehicleName }
  </h3>
);

HeaderTitle.propTypes = {
  vehicleName: PropTypes.string,
  translations: makePhrasesShape(phrases).isRequired,
};

const Header = ({
  ...rest,
  totalAmount,
  filteredAmount,
  isFiltered,
  selectedVehicleName,
  translations,
}) => (
  <div className={css(classes.header)}>
    <HeaderTitle
      vehicleName={selectedVehicleName}
      translations={translations}
    />

    <p className={css(classes.header__sub)}>
      {translations.total} <HighlitedText>{totalAmount}</HighlitedText> {translations.events} <PeriodText translations={translations} {...rest} />
    </p>

    { isFiltered && (
      <p className={css(classes.header__sub)}>
        <HighlitedText>{filteredAmount}</HighlitedText>{` ${translations.events}`}
      </p>
    )}
  </div>
);

Header.propTypes = {
  totalAmount: PropTypes.number.isRequired,
  filteredAmount: PropTypes.number,
  isDefaultRange: PropTypes.bool.isRequired,
  isFiltered: PropTypes.bool.isRequired,
  dateRange: PropTypes.shape(dateShape),
  selectedVehicleName: PropTypes.string,
  translations: makePhrasesShape(phrases).isRequired,
};

Header.defaultTypes = {
  dateRange: undefined,
  selectedVehicleName: undefined,
};

export default translate(phrases)(Header);
