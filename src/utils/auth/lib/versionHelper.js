export const CURRENT_AUTH_VERSION = 2.51;

export default function (version) {
  if (version === null || version === undefined) {
    return true;
  }

  return version === CURRENT_AUTH_VERSION;
}
