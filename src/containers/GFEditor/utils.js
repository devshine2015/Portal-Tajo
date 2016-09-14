import { NEW_GF_REQUIRED_ZOOM_LEVEL } from 'utils/constants';
import { makeLocalGF } from 'services/FleetModel/utils/gfHelpers';

export function initiateGfEditingCallback(theMap, subjUpdateFunc) {
  return (e) => {
    // if (inThis.props.gfEditMode) { // already editing?
    //   return;
    // }
    subjUpdateFunc(makeLocalGF(e.latlng));
    if (theMap.getZoom() < NEW_GF_REQUIRED_ZOOM_LEVEL) {
      theMap.setZoomAround(e.latlng, NEW_GF_REQUIRED_ZOOM_LEVEL);
    }
  };
}
