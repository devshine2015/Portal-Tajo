import React from 'react';
import { connect } from 'react-redux';
import cs from 'classnames';
import { css } from 'aphrodite/no-important';
import Widget from 'components/Widget';
import { localesSupported, setLocale } from 'utils/i18n';
import { updateUserSettings } from 'services/UserModel/actions';
import { getLocale } from 'services/UserModel/reducer';

import classes from './classes';

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
  currentLanguage,
  changeLanguage,
}) {
  return localesSupported.map(lang => (
    <LangOption
      text={lang}
      key={lang}
      onClick={changeLanguage}
      isSelected={ currentLanguage === lang }
    />
  ));
}

const _changeLocation = dispatch => nextLang => {
  dispatch(updateUserSettings(true, {
    lang: nextLang,
  }))
    .then(() => {
      setLocale(nextLang);
    });
};

const LanguageWidget = (props) => (
  <Widget
    title={WIDGET_TITLE}
    containerClass={classes.languageWidget}
  >
    <div className={css(classes.lang)}>
      <div className={css(classes.lang__text)}>
        { MAIN_TEXT }
      </div>

      <div className={css(classes.lang__options)}>
        { _renderOptions(props) }
      </div>
    </div>
  </Widget>
);

LanguageWidget.propTypes = {
  currentLanguage: React.PropTypes.oneOf(localesSupported).isRequired,
  changeLanguage: React.PropTypes.func.isRequired,
};

const mapState = state => ({
  currentLanguage: getLocale(state),
});

const mapDispatch = dispatch => ({
  changeLanguage: _changeLocation(dispatch),
});

export default connect(mapState, mapDispatch)(LanguageWidget);
