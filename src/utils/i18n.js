import Polyglot from 'node-polyglot';

const polyglot = new Polyglot();

export default polyglot;

export const extend = (translation) => {
  polyglot.extend(translation);
};

export const setLocale = nextLocale => {
  // remove all previously registered phrases
  polyglot.clean();
  polyglot.locale(nextLocale);
};
