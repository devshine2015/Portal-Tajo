import React from 'react';
import Polyglot from 'node-polyglot';
import transformLocale from './lib/TransformLocale';

function _isLocaleSupported(nextLocale = '', supportedLocalesList = []) {
  return supportedLocalesList.indexOf(nextLocale) !== -1;
}

const DEFAULT_LOCALE = 'en';

class Translator {
  constructor(phrases, locales) {
    this._locales = locales || [DEFAULT_LOCALE];
    this.p = new Polyglot({
      phrases,
      locale: transformLocale(window.navigator.language || DEFAULT_LOCALE),
    });

    this.subscribtions = {};
  }

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

    this.translator = new Translator(props.phrases, props.locales);
  }

  getChildContext() {
    return {
      translator: this.translator,
    };
  }

  render() {
    return this.props.children;
  }
}

TranslationProvider.propTypes = {
  phrases: React.PropTypes.object.isRequired,
  locales: React.PropTypes.arrayOf(
    React.PropTypes.string
  ).isRequired,
  children: React.PropTypes.any.isRequired,
};

TranslationProvider.childContextTypes = {
  translator: React.PropTypes.object,
};

export default TranslationProvider;
