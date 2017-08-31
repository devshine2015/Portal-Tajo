import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite/no-important';

import classes from './classes';
import GooglePlacesSearch from '../GooglePlacesSearch';
import MapMarkerToggle from '../MapMarkerToggle';

const Control = ({ children, sizes }) => (
  <div
    className={css(classes.control)}
    style={sizes}
  >
    { children }
  </div>
);

Control.propTypes = {
  children: PropTypes.any.isRequired,
  sizes: PropTypes.shape({
    width: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    height: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  }),
};

Control.defaultProps = {
  overrideListType: undefined,
  sizes: {},
};

const CustomControls = ({
  theMap,
  overrideListType,
}) => (
  <div className={css(classes.customControls)}>
    <Control>
      <MapMarkerToggle overrideListType={overrideListType} />
    </Control>
    <Control
      sizes={{
        width: 'auto',
        height: 'auto',
      }}
    >
      <GooglePlacesSearch ownerMapObj={theMap} />
    </Control>
  </div>
);

CustomControls.propTypes = {
  theMap: PropTypes.object.isRequired,
  overrideListType: PropTypes.string,
};

CustomControls.defaultProps = {
  overrideListType: undefined,
};

// CustomControls.Control = Control;

export default CustomControls;
