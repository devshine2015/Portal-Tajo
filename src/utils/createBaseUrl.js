import { portal, onDev } from 'configs';

export default function createBaseUrl(fleet = undefined) {
  // on dev environments we don't have fleet in url
  if (onDev && portal === 'tajo') return '/tajo';

  return !fleet ? '' : `/portal/${fleet}/${portal}`;
}
