import React from 'react';
import { connect } from 'react-redux';
import pure from 'recompose/pure';
import { Map } from 'immutable';
import {
  AutoComplete,
  MenuItem,
  IconButton,
  RefreshIndicator,
} from 'material-ui';
import { fetchDevices } from 'services/Devices/actions';
import {
  getDevices,
  getVacantDevices,
} from 'services/Devices/reducer';
import theme from 'configs/theme';

import styles from './styles.css';

const ERROR_MESSAGE = 'You must choose one of existing devices';

const STYLES = {
  fullWidth: {
    width: '100%',
  },
  disabled: {
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: 'rgb(224, 224, 224)',
  },
  refreshStatic: {
    position: 'relative',
    backgroundColor: 'transparent',
    boxShadow: 'none',
  },
};

const RefreshButton = ({ onClick, isRefreshing }) => {
  let otherProps;

  if (isRefreshing) {
    otherProps = {
      percentage: 0,
      status: 'loading',
      loadingColor: theme.palette.accent1Color,
    };
  } else {
    otherProps = {
      percentage: 100,
      status: 'ready',
      style: STYLES.refreshStatic,
    };
  }

  return (
    <IconButton onClick={onClick}>
      <RefreshIndicator
        top={9}
        left={9}
        size={29}
        {...otherProps}
      />
    </IconButton>
  );
};

RefreshButton.propTypes = {
  onClick: React.PropTypes.func.isRequired,

  // rotate icon during refresh
  isRefreshing: React.PropTypes.bool.isRequired,
};

class Device extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
      isRefreshing: false,
    };
  }

  componentWillMount() {
    if (this.props.devices.size === 0) {
      this.props.fetchDevices();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.forcedValue !== null) {
      this.setState({
        searchText: nextProps.forcedValue,
      });
    }
  }

  onUpdateInput = searchText => {
    this.setState({
      searchText,
    }, () => {
      this.props.onChange('imei', searchText);
    });
  }

  focusOnError = ref => {
    if (!this.props.hasError) return;

    ref.focus();
  }

  refresh = () => {
    if (this.state.isRefreshing) return;

    this.setState({
      isRefreshing: true,
    });
  }

  render() {
    const error = this.props.hasError ? ERROR_MESSAGE : '';
    const dataSource = this.props.vacantDevices.map(id => {
      const device = this.props.devices.get(id);

      return {
        text: device.original.sn,
        value: (
          <MenuItem
            primaryText={device.original.sn}
            secondaryText={(
              <div className={styles.kindText}>
                {device.original.kind}
              </div>
            )}
          />
        ),
      };
    });

    return (
      <div className={styles.device}>
        <AutoComplete
          required
          fullWidth
          name="imei"
          disabled={this.state.isRefreshing}
          floatingLabelText="IMEI"
          dataSource={dataSource}
          filter={AutoComplete.fuzzyFilter}
          onNewRequest={this.props.onSelect}
          onUpdateInput={this.onUpdateInput}
          errorText={error}
          maxSearchResults={7}
          searchText={this.state.searchText}
          ref={this.focusOnError}
          style={STYLES.fullWidth}
          underlineDisabledStyle={STYLES.disabled}
        />
        <RefreshButton
          onClick={this.refresh}
          isRefreshing={this.state.isRefreshing}
        />
      </div>
    );
  }
}

Device.propTypes = {
  fetchDevices: React.PropTypes.func.isRequired,

  // value to set by force from parent component
  forcedValue: React.PropTypes.string,

  // true if no device has been chosen
  hasError: React.PropTypes.bool.isRequired,

  // Callback function that is fired when a list item is selected,
  // or enter is pressed in the TextField.
  onSelect: React.PropTypes.func.isRequired,

  // Callback function that is fired when
  // the user updates the TextField.
  onChange: React.PropTypes.func.isRequired,

  // list of all devices
  devices: React.PropTypes.instanceOf(Map).isRequired,

  // array of ids
  vacantDevices: React.PropTypes.arrayOf(
    React.PropTypes.string
  ).isRequired,
};

const mapState = state => ({
  devices: getDevices(state),
  vacantDevices: getVacantDevices(state),
});
const mapDispatch = {
  fetchDevices,
};

const PureDevice = pure(Device);

export default connect(mapState, mapDispatch)(PureDevice);
