import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import p, { localesSupported, extend } from 'utils/i18n';
import { getLocale } from 'services/UserModel/reducer';

function _translate(phrases, currentLocale) {
  const nextPhrases = phrases[currentLocale];
  const result = {};

  extend(nextPhrases);

  Object.keys(nextPhrases).forEach(phrase => {
    result[phrase] = p.t(phrase);
  });

  return result;
}

export default (phrases) => (Component) => {
  const Translator = (props) => (
    <Component
      translations={_translate(phrases, props.currentLocale)}
      {...props}
    />
  );

  Translator.propTypes = {
    currentLocale: React.PropTypes.oneOf(localesSupported).isRequired,
  };

  const mapState = state => ({
    currentLocale: getLocale(state),
  });

  const Connected = connect(mapState)(Translator);

  return pure(Connected);
};
