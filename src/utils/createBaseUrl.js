import { ROOT_ROUTE } from 'configs';

export default function createBaseUrl() {
  // on dev environments we don't have fleet in url
  return ROOT_ROUTE;
}
