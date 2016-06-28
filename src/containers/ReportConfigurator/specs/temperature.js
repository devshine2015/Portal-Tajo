import moment from 'moment';

class Temp {

  setTemps = (temps, date, vehicleId) => {
    if (!this[date]) {
      this[date] = {};
    }

    this[date][vehicleId] = temps;
  }

  calcTemperature = (records = [], date, param) => {
    const _this = this;

    return records.map(({ reportRecords, vehicle }) => {
      if (_this[date] && _this[date][vehicle.id] && _this[date][vehicle.id][param]) {
        return _this[date][vehicle.id][param];
      }

      let resultTemps = {
        minTemp: 'n/a',
        maxTemp: 'n/a',
        avgTemp: 'n/a',
      };

      if (reportRecords.length === 0) {
        _this.setTemps(resultTemps, date, vehicle.id);

        return resultTemps[param];
      }

      const filtered = reportRecords.filter(rec => (
        moment(date).isSame(moment(rec.time).toISOString(), 'day')
      ));

      if (filtered.length === 0) {
        _this.setTemps(resultTemps, date, vehicle.id);

        return resultTemps[param];
      }

      let minTemp = filtered[0].temp;
      let maxTemp = filtered[filtered.length - 1].temp;
      let temps = 0;

      for (let i = 0; i < filtered.length; i++) {
        temps += filtered[i].temp;

        if (filtered[i].temp < minTemp) {
          minTemp = filtered[i].temp;
        } else {
          maxTemp = filtered[i].temp;
        }
      }

      const avgTemp = temps / filtered.length;

      resultTemps = {
        minTemp,
        maxTemp,
        avgTemp,
      };

      _this.setTemps(resultTemps, date, vehicle.id);

      return resultTemps[param];
    });
  }

  getFields = () => {
    const _this = this;

    return [{
      label: 'Min. Temperature',
      name: 'minTemp',
      endpoint: 'temperature',
      reportType: 'minTemp',
      order: 3,
      query: 'downsampleSec=0',
      calc: (records = [], date) =>
        _this.calcTemperature(records, date, 'minTemp'),
    }, {
      label: 'Max. Temperature',
      name: 'maxTemp',
      endpoint: 'temperature',
      reportType: 'maxTemp',
      order: 4,
      query: 'downsampleSec=0',
      calc: (records = [], date) =>
        _this.calcTemperature(records, date, 'maxTemp'),
    }, {
      label: 'Average Temperature',
      name: 'avgTemp',
      endpoint: 'temperature',
      reportType: 'avgTemp',
      order: 5,
      query: 'downsampleSec=0',
      calc: (records = [], date) =>
        _this.calcTemperature(records, date, 'avgTemp'),
    }];
  }
}

function _tempSpecs() {
  const t = new Temp();

  return t.getFields();
}

export default _tempSpecs;
