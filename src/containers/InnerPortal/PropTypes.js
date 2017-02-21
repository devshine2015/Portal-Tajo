import React from 'react';

const shape = React.PropTypes.shape;
const string = React.PropTypes.string;
const number = React.PropTypes.number;
const arrayOf = React.PropTypes.arrayOf;

export default shape({
  name: string.isRequired,
  index: number.isRequired,
  path: string.isRequired,
  excludeRoles: arrayOf(string),
  includeRoles: arrayOf(string),
});
