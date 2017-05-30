import { PropTypes } from 'react';

export default PropTypes.shape({
  id: PropTypes.string.isRequired,
  eventTS: PropTypes.instanceOf(Date).isRequired,
  eventKind: PropTypes.string.isRequired,
  eventName: PropTypes.string.isRequired,
  ownerName: PropTypes.string.isRequired,
  ownerId: PropTypes.string.isRequired,
});
