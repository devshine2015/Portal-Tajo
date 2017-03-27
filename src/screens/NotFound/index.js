import React from 'react';
import { translate } from 'utils/i18n';

import phrases, { phrasesShape } from './PropTypes';

const NotFound = (props) => (
  <div>
    { props.translations.not_found }
  </div>
);

NotFound.propTypes = {
  translations: phrasesShape.isRequired,
};

export default translate(phrases)(NotFound);
