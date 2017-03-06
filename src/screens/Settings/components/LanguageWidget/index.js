import React from 'react';
import cs from 'classnames';
import { css } from 'aphrodite/no-important';
import Widget from 'components/Widget';
import { translate } from 'utils/i18n';
import { locales } from 'configs/phrases';

import classes from './classes';
import { phrasesShape } from './PropTypes';

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

function _renderOptions(translator) {
  return locales.map(lang => (
    <LangOption
      text={lang}
      key={lang}
      onClick={translator.setLocale}
      isSelected={ translator.getLocale() === lang }
    />
  ));
}

const LanguageWidget = ({
  translations,
}, {
  translator,
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
        { _renderOptions(translator) }
      </div>
    </div>
  </Widget>
);

LanguageWidget.contextTypes = {
  translator: React.PropTypes.object.isRequired,
};

LanguageWidget.propTypes = {
  translations: phrasesShape.isRequired,
};

LanguageWidget.defaultProps = {
  translations: {
    language_settings_title: 'Language',
    language_settings_main_text: 'Application language',
  },
};

LanguageWidget.displayName = 'LanguageWidget';

export default translate()(LanguageWidget);
