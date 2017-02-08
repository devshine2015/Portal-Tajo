/* eslint-disable func-names, prefer-arrow-callback, space-before-function-paren */
import chai from 'chai';
import { Map } from 'immutable';
import * as helpers from '../vehicleHelpers';
import { ZOMBIE_TIME_TRH_MIN, LAG_INDICAION_TRH_MIN } from 'utils/constants';
import { hasNothingStats, normalStats } from './stats.mock';
import { backEndObject } from './backend.mock';

const should = chai.should(); // eslint-disable-line no-unused-vars

describe('Fleet model vehicle helpers', function() {
  describe('checkIgnition()', function() {
    const checkIgnition = helpers.checkIgnition;

    it('should return 2 if `ignOn` is undefined', function() {
      const result = checkIgnition();

      result.should.be.equal(2);
    });

    it('should return 1 if `ignOn` is true', function() {
      const result = checkIgnition(true);

      result.should.be.equal(1);
    });

    it('should return 0 if `ignOn` is false', function() {
      const result = checkIgnition(false);

      result.should.be.equal(0);
    });
  });

  describe('checkLaggedVehicle()', function() {
    it('should not be delayed', function() {
      const minutes = LAG_INDICAION_TRH_MIN - 1;
      const result = helpers.checkLaggedVehicle(minutes);

      should.equal(result, false);
    });

    it('should be delayed', function() {
      const del1 = LAG_INDICAION_TRH_MIN + 1;
      const del2 = ZOMBIE_TIME_TRH_MIN - 1;
      const result1 = helpers.checkLaggedVehicle(del1);
      const result2 = helpers.checkLaggedVehicle(del2);

      should.equal(result1, true);
      should.equal(result2, true);
    });

    it('should be zombie', function() {
      const minutes = ZOMBIE_TIME_TRH_MIN + 1;
      const result = helpers.checkLaggedVehicle(minutes);

      should.equal(result, false);
    });
  });

  describe('makeLocalVehicle()', function() {
    const makeLocalVehicle = helpers.makeLocalVehicle;

    before('create vehicle', function() {
    });

    it('should return null if vehicle has status different from \'active\'', function() {
      const status = {
        status: 'some_other_status',
      };
      const resultWitStatus = makeLocalVehicle(status);

      should.equal(resultWitStatus, null);
    });

    it('should return immutable Map', function() {
      const result = makeLocalVehicle(backEndObject);

      result.should.be.an.instanceOf(Map);
    });

    it('vehicle should has all required properties', function() {
      const result = makeLocalVehicle(backEndObject, normalStats).toJS();

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
      result.should.have.ownProperty('filteredOut');
      result.should.have.ownProperty('timeSinceUpdateMin');
      result.should.have.ownProperty('estimatedTravelKm');
    });

    it('should has \'original\' and \'id\' properties', function() {
      const result = makeLocalVehicle(backEndObject).toJS();

      result.should.have.ownProperty('original');
      result.should.have.property('id')
        .that.is.equal(backEndObject.id);
    });

    it('should set kind explicitly if it is not defined', function() {
      delete backEndObject.kind;

      const kindResult = makeLocalVehicle(backEndObject).toJS();

      kindResult.original.kind.should.be.equal('UNDEFINED');
    });
  });

  describe('_checkIsDead()', function() {
    const checkIsDead = helpers._private._checkIsDead;

    it('vehicle should be dead', function() {
      const isAlive = hasNothingStats.hasOwnProperty('pos');
      const result = checkIsDead(isAlive);

      result.should.be.equal(!isAlive);
    });

    it('vehicle should not be dead', function() {
      const isDead = normalStats.hasOwnProperty('pos');
      const result = checkIsDead(isDead);

      result.should.be.equal(!isDead);
    });
  });

  describe('getVehicleById()', function() {
    const getVehicleById = helpers.getVehicleById;

    it('should return \'vehicleIndex\' and \'vehicle\'', function() {
      const result = getVehicleById();

      result.should.have.property('vehicleIndex');
      result.should.have.property('vehicle');
    });

    it('should return correct index and vehicle object', function() {
      const list = [{
        id: 'a',
      }, {
        id: 'b',
      }];
      const id = 'b';
      const result = getVehicleById(id, list);
      const expected = {
        vehicleIndex: 1,
        vehicle: list[1],
      };

      result.should.be.eql(expected);
    });
  });

  describe('cleanVehicle()', function() {
    const cleanVehicle = helpers.cleanVehicle;
    const someVehicle = {
      ololo: 1,
      parampampam: 'blah',
      year: 123,
      model: 'model',
      id: 'a1',
    };

    it('should not has unappropriate properties in result', function() {
      const result = cleanVehicle(someVehicle);

      result.should.not.have.property('ololo');
      result.should.not.have.property('parampampam');
    });

    it('should return just props required by backend', function() {
      const requiredBackEndProps = [
        'id', 'name', 'licensePlate', 'make', 'model', 'kind',
        'odometer', 'year', 'created', 'updated', 'deviceId',
        'status',
      ];
      const result = cleanVehicle(someVehicle);

      requiredBackEndProps.forEach(prop => {
        result.should.have.property(prop);
      });
    });
  });

  describe('sortVehicles()', function() {
    const sortVehicles = helpers.sortVehicles;
    const expected = ['1', '0'];

    it('should sort raw backendObject and return array sorted by name', function() {
      const dummyBackEndObject = [{
        name: 'b',
        id: '0',
      }, {
        name: 'aaa',
        id: '1',
      }];
      const result = sortVehicles(dummyBackEndObject);

      result.should.be.eql(expected);
    });

    it('should sort list of immutable map', function() {
      const listOfMaps = [new Map({
        id: '0',
        original: {
          name: 'b',
        },
      }), new Map({
        id: '1',
        original: {
          name: 'aaa',
        },
      })];
      const result = sortVehicles(listOfMaps);

      result.should.be.eql(expected);
    });
  });

  describe('makeLocalVehicles()', function() {
    const makeLocalVehicles = helpers.makeLocalVehicles;

    it('should return appropriate properties', function() {
      const result = makeLocalVehicles();

      result.should.have.property('localVehicles')
        .that.is.an('object');
      result.should.have.property('orderedVehicles')
        .that.is.an('array');
      result.should.have.property('deadList')
        .that.is.an('array');
      result.should.have.property('delayedList')
        .that.is.an('array');
    });
  });
});
