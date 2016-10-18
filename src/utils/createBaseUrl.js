import { portal, onDev, ROOT_ROUTE } from 'configs';

export default function createBaseUrl(fleet = undefined) {
  // on dev environments we don't have fleet in url
  return onDev ? ROOT_ROUTE : `/portal/${fleet}/${portal}`;
}
