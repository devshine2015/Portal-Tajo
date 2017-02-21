import React from 'react';

const shape = React.PropTypes.shape;
const string = React.PropTypes.string;

const phrases = {
  en: {
    logout: 'logout',
  },

  th: {
    logout: 'ลงชื่อออก',
  },
};

export const phrasesShape = shape({
  logout: string.isRequired,
});

export default phrases;
