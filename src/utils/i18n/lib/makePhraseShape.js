import { PropTypes } from 'react';

const shape = PropTypes.shape;
const string = PropTypes.string;

const makePhrasesShape = (phrases = []) => {
  const res = {};

  phrases.forEach((phr) => {
    res[phr] = string.isRequired;
  });

  return res;
};

export default function (phrases = []) {
  return shape(makePhrasesShape(phrases));
}
