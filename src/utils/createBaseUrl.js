import { serverFolder } from 'configs';

export default function createBaseUrl(fleet = 'test') {
  return `/portal/${fleet}/${serverFolder}`;
}
