/* eslint-disable func-names, prefer-arrow-callback, space-before-function-paren */
import chai from 'chai';
import { _private as helpers } from '../vehicleHelpers';

const should = chai.should(); // eslint-disable-line no-unused-vars

describe('Fleet model vehicle helpers', function() {
  describe('checkIgnition', function() {
    const _checkIgnition = helpers._checkIgnition;

    it('should return 2 if `ignOn` is undefined', function() {
      const status = {};
      const result = _checkIgnition(status);

      result.should.be.equal(2);
    });

    it('should return 1 if `ignOn` is true', function() {
      const status = {
        ignOn: true,
      };
      const result = _checkIgnition(status);

      result.should.be.equal(1);
    });

    it('should return 0 if `ignOn` is false', function() {
      const status = {
        ignOn: false,
      };
      const result = _checkIgnition(status);

      result.should.be.equal(0);
    });
  });
});
