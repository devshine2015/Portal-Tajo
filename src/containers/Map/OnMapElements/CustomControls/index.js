import React from 'react';
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
  children: React.PropTypes.any.isRequired,
  sizes: React.PropTypes.shape({
    width: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
    ]),
    height: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
    ]),
  }),
};

Control.defaultProps = {
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
  theMap: React.PropTypes.object,
  overrideListType: React.PropTypes.string,
};

// CustomControls.Control = Control;

export default CustomControls;
