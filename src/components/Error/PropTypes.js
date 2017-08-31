import PropTypes from 'prop-types';

const shape = PropTypes.shape;
const string = PropTypes.string;

const phrases = {
  'Failed to fetch': 'Server is temporaly down. Please try again later',
  'Not Found': 'Resource is not found. Please contact with administrator',
  Unauthorized: 'Username/password combination is wrong.',
};

export const phrasesShape = shape({
  'Failed to fetch': string.isRequired,
  'Not Found': string.isRequired,
  Unauthorized: string.isRequired,
});

export default phrases;
