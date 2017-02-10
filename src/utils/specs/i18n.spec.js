/* eslint-disable func-names, prefer-arrow-callback, space-before-function-paren */

import chai from 'chai';
import Polyglot from 'node-polyglot';
import polyglot, { extend, setLocale } from '../i18n';

const should = chai.should(); // eslint-disable-line no-unused-vars

describe('i18n translation util', function() {
  it('should return Polyglot instance', function() {
    polyglot.should.be.instanceOf(Polyglot);
  });

  it('should extend dictionary', function() {
    const phrases = {
      test_me: "Hello, I'm a test phrase",
    };

    extend(phrases);

    polyglot.phrases.should.be.eql(phrases);
  });

  it('should set locale', function() {
    const locale = 'en';

    setLocale(locale);

    polyglot.currentLocale.should.be.equal(locale);
  });

  it('should not set unsupported locale', function() {
    const locale = 'fr';

    setLocale(locale);

    polyglot.currentLocale.should.be.equal('en');
  });
});
