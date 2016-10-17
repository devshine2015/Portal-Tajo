import React from 'react';
import moment from 'moment';
// import { connect } from 'react-redux';
// import { List } from 'immutable';
import api from 'utils/api';
import endpoints from 'configs/endpoints';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import getPeriods from 'containers/Report/utils/periods';
import { getReportParams } from 'containers/Report/utils/prepareReport';

const host = 'https://drvrapp.net';

const fleets = [{
  name: 'bbt',
  'drvr-session': '4bc4c283-74e5-4d41-8692-e6ab01d71a51',
}, {
  name: 'boss',
  'drvr-session': '88d1ef24-2eeb-489e-bc82-5d7f0373b8c5',
}, {
  name: 'eager',
  'drvr-session': '84f79b4b-6314-457f-bbee-52316f486952',
}, {
  name: 'growthmyanmar',
  'drvr-session': 'e4ef0233-dc33-4a21-a009-20935efa3680',
}, {
  name: 'mgrock',
  'drvr-session': 'b01a2310-7c5b-4163-8b40-8b921800f7f8',
}, {
  name: 'powerbuy',
  'drvr-session': 'f6dd73f3-ca64-4395-a951-71a9365182ff',
}, {
  name: 'psl',
  'drvr-session': '58465b52-a044-431d-be24-00a7eb666f78',
}, {
  name: 'wasuthagroup',
  'drvr-session': '1a095957-8211-43e6-9cb6-f0f286e7e4e2',
}, {
  name: 'yoma',
  'drvr-session': 'f8b0c49d-84b0-4a00-aca3-2b46ab0c19b9',
}];

class EventsCalculator extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      allEventsAmount: 0,
      average: 0,
      totalVehicles: 0,
      result: undefined,
      isLoading: false,
      start: undefined,
      end: undefined,
    };
  }

  onClick = () => {
    const result = [];
    let allEventsAmount = 0;
    const frequency = this.state.end && 'daily';
    const wholePeriod = {
      start: this.state.start,
      end: this.state.end,
    };

    this.setState({
      allEventsAmount: 0,
      average: 0,
      totalVehicles: 0,
      result: undefined,
      isLoading: true,
    });

    const periods = getPeriods(wholePeriod, frequency);
    const isSingleDay = !this.state.end || this.state.end === this.state.start;

    Promise.all(
      periods.map((momentDate, j, a) => {
        const isLastDate = j === a.length - 1;

        // don't calculate for last period
        // if (!isSingleDay && isLastDate) return;
        if (isSingleDay && isLastDate) return Promise.resolve();

        const period = {};

        if (isSingleDay && !isLastDate) {
          period.start = moment(momentDate);
          period.end = momentDate.add(1, 'days');
        } else if (!isSingleDay) {
          if (!isLastDate) {
            period.start = momentDate;
            period.end = a[j + 1];
          } else {
            period.start = moment(momentDate);
            period.end = momentDate.add(1, 'days');
          }
        }

        const params = {
          ...getReportParams(period),
          max: 100000,
          filter: 'PG',
        };

        return Promise.all(fleets.map(f => {
          const { url, method, apiVersion } = endpoints.getVehicles;
          return api[method](url, {
            apiVersion,
            host,
            optionalFleet: f.name,
            optionalHeaders: {
              ['DRVR-SESSION']: f['drvr-session'],
            },
          })
          .then(res => res.json())
          .then(vehicles => (
            Promise.all(
              vehicles.map(vehicle => {
                const { url, method, apiVersion } = endpoints.getEventsInTimeRange(vehicle.id, params);

                return api[method](url, {
                  apiVersion,
                  host,
                  optionalFleet: f.name,
                  optionalHeaders: {
                    ['DRVR-SESSION']: f['drvr-session'],
                  },
                })
                .then(res => res.json())
                .then(events => events.filter(({ type }) => type === 'vehicle-position').length);
              })
            )
            .then(eventsPerVehicle => {
              let eventsPerFleet = 0;

              eventsPerVehicle.forEach(amount => {
                eventsPerFleet += amount;
              });

              return eventsPerFleet;
            })
            .then(eventsPerFleet => {
              result.push({
                date: period.start.toDate(),
                name: f.name,
                amount: eventsPerFleet,
              });
              allEventsAmount += eventsPerFleet;

              return vehicles.length;
            })
          ));
        }))
        .then(lol => {
          let vehiclesAmount = 0;

          lol.forEach(l => {
            vehiclesAmount += l;
          });

          this.setState({
            result,
            allEventsAmount,
            average: (allEventsAmount / vehiclesAmount).toFixed(1),
            totalVehicles: vehiclesAmount,
          });
        });
      })
      )
      .then(() => {
        this.setState({
          isLoading: false,
        });
      });
  }

  onStartChange = (e, newDate) => {
    this.onPeriodChange(newDate, 'start');
  }

  onEndChange = (e, newDate) => {
    this.onPeriodChange(newDate, 'end');
  }

  onPeriodChange = (newDate, type) => {
    this.setState({
      [type]: newDate,
    });
  }

  renderResult() {
    if (!this.state.result) return null;

    return this.state.result.map((r, i) => (
      <li key={i}>
        {r.name}: {r.date.toLocaleDateString()} – {r.amount}
      </li>
    ));
  }

  renderPeriod() {
    return (
      <div>
        <DatePicker
          name="start"
          disabled={this.state.isLoading}
          hintText="Begin of Period"
          onChange={this.onStartChange}
          value={this.state.start}
          disableYearSelection
          autoOk
        />
        <DatePicker
          name="end"
          disabled={this.state.isLoading}
          hintText="Begin of Period"
          onChange={this.onEndChange}
          value={this.state.end}
          disableYearSelection
          autoOk
        />
      </div>
    );
  }

  render() {
    return (
      <div>
        { this.renderPeriod() }
        <RaisedButton
          disabled={this.state.isLoading}
          label="Get average events"
          onClick={this.onClick}
          primary
        />
        <ul>
          { this.renderResult() }
        </ul>
        <div>
          <b>total vehicles: {this.state.totalVehicles}</b><br />
          <b>total events: {this.state.allEventsAmount}</b><br />
          <b>average events per vehicle: {this.state.average}</b>
        </div>
      </div>
    );
  }
}

export default EventsCalculator;
