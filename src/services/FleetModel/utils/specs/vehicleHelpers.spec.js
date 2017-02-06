/* eslint-disable func-names, prefer-arrow-callback, space-before-function-paren */
import chai from 'chai';
import { _private as helpers } from '../vehicleHelpers';

const should = chai.should();

describe('Fleet model vehicle helpers', function() {
  describe('checkIgnition', function() {
    const _checkIgnition = helpers._checkIgnition;

    it('should return 2 if `ignOn` is undefined', function() {
      const status = {};
      const result = _checkIgnition(status);

      result.should.be.equal(2);
    });
  });
});
