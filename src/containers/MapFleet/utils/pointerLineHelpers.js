/**
 */
import styles from './pointerLine.css';

const _pointerLineWidth = 1000;

export function createPointerLine(pos, anchor) {
  const pointerIcon = window.L.divIcon({ className: styles.pointerLine,
    iconSize: [0, 2],
    iconAnchor: [_pointerLineWidth + anchor[0], anchor[1]] });
  const thePointer = window.L.marker(pos,
      { icon: pointerIcon });
  thePointer.setZIndexOffset(20000);
  return thePointer;
}

//
// TODO: better way instead of accessing _icon directly?
export function showPointerLine(theLine, doShow) {
  if (doShow) {
    //
    // TODO: investigate why no icon when opening GF editor
    if (theLine._icon) {
      theLine._icon.style.width = _pointerLineWidth.toString() + 'px';
      theLine._icon.style.opacity = '1';
    }
  } else {
    //
    // TODO: investigate why no icon when opening GF editor
    if (theLine._icon) {
      theLine._icon.style.width = '0px';
      theLine._icon.style.opacity = '1';
    }
  }
}
