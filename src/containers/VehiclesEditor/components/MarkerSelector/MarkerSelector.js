import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite/no-important';
import markerTypes from 'services/FleetModel/utils/markerTypes';
import {
  SelectField,
  MenuItem,
} from 'material-ui';
import {
  translate,
  makePhrasesShape,
} from 'utils/i18n';
import classes from './classes';
import phrases from './PropTypes';

// let SelectedKindIcon = () => null;
const STYLES = {
  menuItem: {
    paddingTop: 5,
    paddingBottom: 5,
  },
};

class MarkerSelector extends React.PureComponent {
  renderMarkerMenuItems() {
    return Object.keys(markerTypes).map((key) => {
      const kind = markerTypes[key];
      // const Icon = () => React.cloneElement(kind.icon, {
      //   className: css(classes.vehicleIcon),
      // });
      return (
        <MenuItem
          key={kind}
          value={kind}
          primaryText={this.props.translations[kind]}
          style={STYLES.menuItem}
        />
      );
    });
  }

  render() {
    return (
      <div className={css(classes.kindOfSelector)}>
        <div className={css(classes.kindOfLabel)}>
          <span className={css(classes.kindOfName)}>
            { this.props.translations.map_marker }
          </span>
        </div>
        <SelectField
          autoWidth
          name="markerKind"
          value={this.props.kind}
          onChange={this.props.onChange}
          style={{
            top: -12,
            width: 100,
          }}
        >
          {this.renderMarkerMenuItems()}
        </SelectField>
      </div>);
  }
}

MarkerSelector.propTypes = {
  kind: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  translations: makePhrasesShape(phrases).isRequired,
};

export default translate(phrases)(MarkerSelector);
