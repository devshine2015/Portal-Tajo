import { PropTypes } from 'react';

const shape = PropTypes.shape;
const string = PropTypes.string;

export const phrasesShape = shape({
  loading: string.isRequired,
  please_wait: string.isRequired,
  no_data: string.isRequired,
  please_select_vehicle: string.isRequired,
  max_speed: string.isRequired,
  max_temp: string.isRequired,
  min_temp: string.isRequired,
});

