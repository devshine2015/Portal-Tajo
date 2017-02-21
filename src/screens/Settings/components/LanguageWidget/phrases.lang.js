import React from 'react';

const shape = React.PropTypes.shape;
const string = React.PropTypes.string;

const phrases = {
  en: {
    language_settings_main_text: 'Application language',
    language_settings_title: 'Language',
  },

  th: {
    language_settings_main_text: 'ภาษาของแอพพลิเคชั่น',
    language_settings_title: 'ภาษา',
  },
};

export const phrasesShape = shape({
  language_settings_main_text: string.isRequired,
  language_settings_title: string.isRequired,
});

export default phrases;
