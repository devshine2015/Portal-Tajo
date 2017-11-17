
import { isDealer } from 'configs';

const objectBelongsToSubFleet = (aObj, subFleet) =>
  aObj.meta !== undefined;
  // return aObj.meta !== undefined && aObj.meta.subfleet === subFleet;

export default (allObjectsArray, selectedSubFleet) => {
  if (!isDealer) {
    return allObjectsArray;
  }
  return allObjectsArray.filter(aObj => objectBelongsToSubFleet(aObj, selectedSubFleet));
  // return allObjectsArray.filter(aObj => aObj.meta !== undefined && aObj.meta.subfleet === selectedSubFleet);
};
