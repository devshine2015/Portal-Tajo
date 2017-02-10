import React from 'react';

const shape = React.PropTypes.shape;
const string = React.PropTypes.string;

const phrases = {
  en: {
    language_settings_main_text: 'Application language',
    language_settings_title: 'Language',
  },

  th: {
    language_settings_main_text: 'Язык приложения',
    language_settings_title: 'Язык',
  },
};

export const phrasesShape = shape({
  language_settings_main_text: string.isRequired,
  language_settings_title: string.isRequired,
});

export default phrases;
