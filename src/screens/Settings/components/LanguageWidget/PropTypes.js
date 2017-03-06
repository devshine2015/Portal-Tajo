import React from 'react';

const shape = React.PropTypes.shape;
const string = React.PropTypes.string;

export const phrasesShape = shape({
  language_settings_main_text: string.isRequired,
  language_settings_title: string.isRequired,
});
