import React from 'react';
import { connect } from 'react-redux';
import cs from 'classnames';
import { css } from 'aphrodite/no-important';
import Widget from 'components/Widget';
import { translate } from 'utils/i18n';
import { locales } from 'configs/phrases';
import { updateUserSettings } from 'services/UserModel/actions';

import classes from './classes';
import phrases, { phrasesShape } from './PropTypes';

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

function _renderOptions(currentLocale, onClick) {
  return locales.map(lang => (
    <LangOption
      text={lang}
      key={lang}
      onClick={onClick}
      isSelected={ currentLocale === lang }
    />
  ));
}

class LanguageWidget extends React.PureComponent {

  onLanguaegeChange = nextLang => {
    this.props.updateUserSettings(true, {
      lang: nextLang,
    });

    this.context.translator.setLocale(nextLang);
  }

  render() {
    const { translations } = this.props;
    const currentLocale = this.context.translator.getLocale();

    return (
      <Widget
        title={translations.language_settings_title}
        containerClass={classes.languageWidget}
      >
        <div className={css(classes.lang)}>
          <div className={css(classes.lang__text)}>
            { translations.language_settings_main_text }
          </div>

          <div className={css(classes.lang__options)}>
            { _renderOptions(currentLocale, this.onLanguaegeChange) }
          </div>
        </div>
      </Widget>
    );
  }
}

LanguageWidget.contextTypes = {
  translator: React.PropTypes.object.isRequired,
};

LanguageWidget.propTypes = {
  updateUserSettings: React.PropTypes.func.isRequired,

  translations: phrasesShape.isRequired,
};

LanguageWidget.defaultProps = {
  translations: phrases,
};

LanguageWidget.displayName = 'LanguageWidget';

const mapDispatch = { updateUserSettings };

const Translated = translate(phrases)(LanguageWidget);

export default connect(null, mapDispatch)(Translated);
