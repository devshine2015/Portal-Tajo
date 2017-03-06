// take main part of locale,
// for example make 'en' from 'en-US';
function transformLocale(locale = '') {
  const l = locale.split('-');

  return l[0].toLowerCase();
}

export default transformLocale;
