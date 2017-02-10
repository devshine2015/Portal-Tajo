import React from 'react';
import { connect } from 'react-redux';
import cs from 'classnames';
import { css } from 'aphrodite/no-important';
import Widget from 'components/Widget';
import { localesSupported, setLocale } from 'utils/i18n';
import translator from 'utils/translator';
import { updateUserSettings } from 'services/UserModel/actions';

import classes from './classes';
import phrases, { phrasesShape } from './phrases.lang';

// const MAIN_TEXT = 'main_language_settings_text';
const MAIN_TEXT = 'Application language';
const WIDGET_TITLE = 'Language';

const LangOption = ({
  text,
  onClick,
  isSelected,
}) => {
  const className = cs(css(classes.option), {
    [css(classes.option_selected)]: isSelected,
  });

  const _onClick = () => onClick(text);

  return (
    <span
      className={className}
      onClick={_onClick}
    >
      { text }
    </span>
  );
};

LangOption.propTypes = {
  isSelected: React.PropTypes.bool.isRequired,
  text: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired,
};

function _renderOptions({
  currentLocale,
  changeLanguage,
}) {
  return localesSupported.map(lang => (
    <LangOption
      text={lang}
      key={lang}
      onClick={changeLanguage}
      isSelected={ currentLocale === lang }
    />
  ));
}

const _changeLocation = (dispatch, ownProps) => nextLang => {
  if (ownProps.currentLocale === nextLang) return;

  setLocale(nextLang);

  dispatch(updateUserSettings(true, {
    lang: nextLang,
  }));
};

const LanguageWidget = ({
  translations,
  ...rest,
}) => (
  <Widget
    title={translations.language_settings_title}
    containerClass={classes.languageWidget}
  >
    <div className={css(classes.lang)}>
      <div className={css(classes.lang__text)}>
        { translations.language_settings_main_text }
      </div>

      <div className={css(classes.lang__options)}>
        { _renderOptions(rest) }
      </div>
    </div>
  </Widget>
);

LanguageWidget.propTypes = {
  currentLocale: React.PropTypes.oneOf(localesSupported).isRequired,
  changeLanguage: React.PropTypes.func.isRequired,

  translations: phrasesShape.isRequired,
};

const mapState = null;

const mapDispatch = (dispatch, ownProps) => ({
  changeLanguage: _changeLocation(dispatch, ownProps),
});

const Connected = connect(mapState, mapDispatch)(LanguageWidget);

export default translator(phrases)(Connected);
