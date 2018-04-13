import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLocale } from 'services/Session/reducer';
import { TranslationProvider } from 'utils/i18n';
import phrases, { locales } from 'configs/phrases';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { theme } from 'configs';

const CommonWrappers = props => (
  <TranslationProvider
    phrases={phrases}
    locales={locales}
    locale={props.lang}
  >
    <MuiThemeProvider muiTheme={theme}>
      {props.children}
    </MuiThemeProvider>
  </TranslationProvider>
);

CommonWrappers.propTypes = {
  children: PropTypes.element.isRequired,
  lang: PropTypes.string,
};
CommonWrappers.defaultProps = {
  lang: 'en',
};

const mapStateToProps = state => ({
  lang: getLocale(state),
});

export default connect(mapStateToProps)(CommonWrappers);
