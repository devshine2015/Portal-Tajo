/* eslint-disable func-names, prefer-arrow-callback, space-before-function-paren */
import chai from 'chai';
import { Map } from 'immutable';
import { _private as helpers } from '../vehicleHelpers';
import { stats } from './vehicle.mock';

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


  describe('_makeImmutableVehicle', function() {
    const _makeImmutableVehicle = helpers._makeImmutableVehicle;
    let imResult;
    let result;
    let status;

    before('create vehicle', function() {
      status = stats[0];
      imResult = _makeImmutableVehicle({
        vehicleStats: status,
      });

      result = imResult.toJS();
    });

    it('should return immutable Map', function() {
      imResult.should.be.an.instanceOf(Map);
    });

    it('should create vehicle with all required common properties', function() {
      result.should.have.ownProperty('isDead');
      result.should.have.ownProperty('isDelayed');
      result.should.have.ownProperty('lastUpdateSinceEpoch');
      result.should.have.ownProperty('ignitionOn');
      result.should.have.ownProperty('isDelayedWithIgnitionOff');
      result.should.have.ownProperty('temp');
      result.should.have.ownProperty('dist');
      result.should.have.deep.property('dist.total');
      result.should.have.deep.property('dist.lastTrip');
      result.should.have.property('pos')
        .that.is.an('array')
          .with.lengthOf(2);
      result.should.have.ownProperty('speed');
    });

    it('vehicle should not be dead', function() {
      const hasPosition = status.hasOwnProperty('pos');

      result.isDead.should.be.equal(hasPosition);
    });
  });
});
