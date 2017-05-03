import React from 'react';
import { css } from 'aphrodite/no-important';
import markerTypes from 'services/FleetModel/utils/markerTypes';
import {
  SelectField,
  MenuItem,
} from 'material-ui';
import classes from './classes';

let SelectedKindIcon = () => null;
const STYLES = {
  menuItem: {
    paddingTop: 5,
    paddingBottom: 5,
  },
};

class MarkerSelector extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedKind: props.kind,
    };
  }
  renderMarkerMenuItems() {
    return Object.keys(markerTypes).map(key => {
      const kind = markerTypes[key];
      // const Icon = () => React.cloneElement(kind.icon, {
      //   className: css(classes.vehicleIcon),
      // });
      return (
        <MenuItem
          key={kind}
          value={kind}
          primaryText={ kind }
          style={STYLES.menuItem}
        />
      );
    });
  }

  render() {
    // if (this.props.kind) {
    //   const selectedKind = getVehicleByValue(this.props.kind);
    //   SelectedKindIcon = () => selectedKind.icon;
    // }

    return (
      <div className={css(classes.kindOfSelector)} key="marker" >
        <div className={css(classes.kindOfLabel)}>
          <span className={css(classes.kindOfName)}> Map Marker</span>
        </div>
        <SelectField
          autoWidth
          hintText={'marker kind'}
          name="markerKind"
          value={this.props.kind}
          onChange={this.props.onChange}
          style={{ top: -12, width: 100, }}
        >
          {this.renderMarkerMenuItems()}
        </SelectField>
      </div>);
  }
}

MarkerSelector.propTypes = {
  kind: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
};

export default MarkerSelector;
