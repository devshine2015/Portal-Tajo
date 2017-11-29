import React from 'react';
import { css } from 'aphrodite/no-important';
import DashboardElements from 'components/DashboardElements';
import pure from 'recompose/pure';

import { theme } from 'configs';
import inClasses from '../styles';
import PropTypes from 'prop-types';

const redBadge = {
  backgroundColor: 'red',
};
const greenBadge = {
  backgroundColor: 'green',
};

class FuelConsumption extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }
  render() {
    const headClass = css(inClasses.tableHead);
    const classNameAltrs = css(inClasses.tableCellAlerts);

    const tableData = this.props.vehicleAlerts.map(
      alert => (<tr>
        <td><div className={classNameAltrs}>
          <div className={css(inClasses.subText)}>{alert.type}</div>
          <div className={css(inClasses.subBadge)} style={redBadge}>1</div>
          <div className={css(inClasses.subText)}>Estimated Fuel Loss </div>
        </div></td>
        <DashboardElements.TableDataCell
          dataString="20"
          dataUnits="ltr"
        />
        <DashboardElements.TableDataCell
          dataString="6.4%"
          style={{ backgroundColor: theme.palette.alertColor }}
        />
      </tr>));


    return (
      <div className={css(inClasses.container)}>
        <div className={css(inClasses.containerHeading)}>Fuel Alerts</div>
        <table >
          <tbody>
            <tr>
              <td className={headClass} />
              <td className={headClass}>Total liters</td>
              <td className={headClass}>% of Fuel Consumption</td>
            </tr>
            {tableData}
          </tbody>
        </table>
      </div>
    );
  }
}

FuelConsumption.propTypes = {
  vehicleAlerts: PropTypes.array.isRequired,
};

export default pure(FuelConsumption);
