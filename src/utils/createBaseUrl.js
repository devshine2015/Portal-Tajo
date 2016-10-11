import { portal } from 'configs';

export default function createBaseUrl(fleet = undefined) {
  return !fleet ? '' : `/portal/${fleet}/${portal}`;
}
