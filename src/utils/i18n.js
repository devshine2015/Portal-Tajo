import Polyglot from 'node-polyglot';

const polyglot = new Polyglot();

export default polyglot;

export const localesSupported = ['en', 'th'];

// take main part of locale,
// for example make 'en' from 'en-US';
function _transformLocale(locale = '') {
  const l = locale.split('-');

  return l[0].toLowerCase();
}

function _isLocaleSupported(nextLocale = '') {
  return localesSupported.indexOf(nextLocale) !== -1;
}

export const extend = phrases => {
  polyglot.extend(phrases);
};

// set next locale if it's supported
// set to 'en' in other case
//
// returns locale have been setup
export const setLocale = nextLocale => {
  const defLocale = 'en';
  const tNextLocale = _transformLocale(nextLocale);
  let resultLocale = defLocale;

  if (_isLocaleSupported(tNextLocale)) {
    resultLocale = tNextLocale;
  }

  // remove all previously registered phrases
  polyglot.clear();
  polyglot.locale(resultLocale);

  return resultLocale;
};
