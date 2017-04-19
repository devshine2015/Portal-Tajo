//
// This adds "open on google-maps option" to context menu of container map
//
//
import React from 'react';
import { addMapMenuItemEx } from 'utils/mapContextMenu';
const iconGMaps16 = require('assets/images/context_menu_icons/gmap16.png');

class OpenGMap extends React.Component {

  componentDidMount() {
    // addMapMenuItem(this.props.theMap, 'mItmRouteTo', (e) => this.openGMaps(e.latlng));
    addMapMenuItemEx(this.props.theMap,
      { text: this.context.translator.getTranslation('ctx_gmap'),
        icon: iconGMaps16,
        callback: (e) => this.openGMaps(e.latlng),
      });
  }

  shouldComponentUpdate() {
    return false;
  }

  openGMaps(latlng) {
    window.open(`https://www.google.com/maps?q=${latlng.lat},${latlng.lng}`);
  }

  render() {
    return false;
  }
}

OpenGMap.propTypes = {
  theMap: React.PropTypes.object,
};
OpenGMap.contextTypes = {
  translator: React.PropTypes.object.isRequired,
};
export default OpenGMap;
