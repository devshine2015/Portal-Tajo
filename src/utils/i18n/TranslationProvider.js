import React from 'react';
import PropTypes from 'prop-types';
import Polyglot from 'node-polyglot';
import transformLocale from './lib/TransformLocale';

function _isLocaleSupported(nextLocale = '', supportedLocalesList = []) {
  return supportedLocalesList.indexOf(nextLocale) !== -1;
}

const DEFAULT_LOCALE = 'en';

class Translator {
  constructor({ phrases, locales, locale }) {
    this._locales = locales || [DEFAULT_LOCALE];
    this.p = new Polyglot({
      phrases,
      locale: transformLocale(locale || window.navigator.language || DEFAULT_LOCALE),
      allowMissing: true,
      onMissingKey: key => {
        const splitted = key.split('.');
        let phrase;
        let phraseLocale;

        if (splitted.length > 1) {
          phraseLocale = splitted[0];
          phrase = splitted[1];
        }

        // some phraseLocale provided, but not found
        // try with default phraseLocale
        if (phraseLocale && (phraseLocale !== DEFAULT_LOCALE)) {
          return this.p.t(`${DEFAULT_LOCALE}.${phrase}`);
        }

        // even default translation not provided
        if (phraseLocale && (phraseLocale === DEFAULT_LOCALE)) {
          return phrase;
        }

        return key;
      },
    });

    this.subscribtions = {};
  }

  getTranslation = (stringKey) => this.p.t(`${this.getLocale()}.${stringKey}`)

  getLocale = () => this.p.locale()

  setLocale = nextLocale => {
    const nextNormalisedLocale = transformLocale(nextLocale);
    let resultLocale = DEFAULT_LOCALE;

    // do nothing is next locale is same as the current one
    if (nextNormalisedLocale === this.getLocale()) return;

    if (_isLocaleSupported(nextNormalisedLocale, this._locales)) {
      resultLocale = nextNormalisedLocale;
    }

    this.p.locale(resultLocale);

    // propagate updates to subscribed components
    Object.values(this.subscribtions).forEach(f => f());
  }

  subscribe = s => {
    Object.assign(this.subscribtions, s);
  }

  unsubscribe = component => {
    delete this.subscribtions[component];
  }

}

class TranslationProvider extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.translator = new Translator(props);
  }

  getChildContext() {
    return {
      translator: this.translator,
    };
  }

  componentWillUpdate(nextProps) {
    this.translator.setLocale(nextProps.locale);
  }

  render() {
    return this.props.children;
  }
}

TranslationProvider.propTypes = {
  phrases: PropTypes.object.isRequired, // eslint-disable-line react/no-unused-prop-types
  locales: PropTypes.arrayOf( // eslint-disable-line react/no-unused-prop-types
    PropTypes.string,
  ).isRequired,
  children: PropTypes.any.isRequired,
};

TranslationProvider.childContextTypes = {
  translator: PropTypes.object,
};

export default TranslationProvider;
