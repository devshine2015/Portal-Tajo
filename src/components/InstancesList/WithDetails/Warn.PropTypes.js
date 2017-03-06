import { PropTypes } from 'react';

const shape = PropTypes.shape;
const string = PropTypes.string;

const phrases = {
  device_never_reported: 'never reported - check device',
};

export const phrasesShape = shape({
  device_never_reported: string.isRequired,
});

export default phrases;
