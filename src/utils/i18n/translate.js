import R from 'ramda';
import React from 'react';
import pure from 'recompose/pure';

function extractPhrasesFromDefaultProps(Component, customPhrases) {
  if (!R.isNil(Component.defaultProps) && !R.isNil(Component.defaultProps.translations)) {
    return R.keys(Component.defaultProps.translations);
  }

  return R.keys(customPhrases);
}

function translatePhrases(translator, phrases) {
  const result = {};
  const locale = translator.getLocale();

  phrases.forEach(phrase => {
    result[phrase] = translator.p.t(`${locale}.${phrase}`);
  });

  return result;
}

export default (phrases = {}) => Component => {
  class Translate extends React.Component {
    constructor(props, context) {
      super(props, context);

      this.componentName = Component.displayName || Component.name;
      this.phrases = extractPhrasesFromDefaultProps(Component, phrases);

      this.state = {
        translations: translatePhrases(context.translator, this.phrases),
      };
    }

    componentDidMount() {
      this.context.translator.subscribe({ [this.componentName]: this.updateTranslations });
    }

    componentWillUnmount() {
      this.context.translator.unsubscribe(this.componentName);
    }

    updateTranslations = () => {
      this.setState({
        translations: translatePhrases(this.context.translator, this.phrases),
      });
    }

    render() {
      return (
        <Component
          translations={this.state.translations}
          {...this.props}
        />
      );
    }
  }

  Translate.contextTypes = {
    translator: React.PropTypes.object.isRequired,
  };

  return pure(Translate);
};
