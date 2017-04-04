import React from 'react';

const shape = React.PropTypes.shape;
const string = React.PropTypes.string;

export default ['profile'];

export const phrasesShape = shape({
  profile: string.isRequired,
});
