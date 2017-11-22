import React from 'react';
import PropTypes from 'prop-types';
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
import { theme } from 'configs';

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
  disabledInput: {
    color: '#000',
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
  onClick: PropTypes.func.isRequired,

  // rotate icon during refresh
  isRefreshing: PropTypes.bool.isRequired,
};

class DeviceSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isRefreshing: false,
      searchText: props.value ? props.value : '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.reset && nextProps.reset) {
      if (!nextProps.value) {
        this.updateSearchText('');
      }
    }

    if (this.props.value !== nextProps.value) {
      this.updateSearchText(nextProps.value);
    }
  }

  onUpdateInput = (searchText) => {
    this.updateSearchText(searchText, () => {
      if (this.props.onChange) {
        this.props.onChange('imei', searchText);
      }
    });
  }

  onDeviceSelect = (value) => {
    this.updateSearchText(value.text, () => {
      if (this.props.onSelect) {
        this.props.onSelect(value.text);
      }
    });
  }

  updateSearchText = (text, cb) => {
    this.setState({
      searchText: text,
    }, () => {
      if (cb && typeof cb === 'function') cb();
    });
  }

  focusOnError = (ref) => {
    if (!this.props.hasError) return;

    ref.focus();
  }

  refresh = () => {
    if (this.state.isRefreshing) return;

    this.setState({
      isRefreshing: true,
    });

    this.props.fetchDevices()
      .then(() => {
        this.setState({
          isRefreshing: false,
        });
      });
  }

  render() {
    const error = this.props.hasError ? ERROR_MESSAGE : '';
    const canRefresh = this.props.canRefresh === undefined ? true : this.props.canRefresh;
    const disabled = this.props.disabled || this.state.isRefreshing;
    const inputStyle = disabled ? STYLES.disabledInput : {};

    const dataSource = this.props.vacantDevices.map((id) => {
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
          openOnFocus
          errorText={error}
          disabled={disabled}
          maxSearchResults={7}
          dataSource={dataSource}
          ref={this.focusOnError}
          style={STYLES.fullWidth}
          floatingLabelText="IMEI"
          inputStyle={inputStyle}
          filter={AutoComplete.fuzzyFilter}
          onNewRequest={this.onDeviceSelect}
          onUpdateInput={this.onUpdateInput}
          searchText={this.state.searchText}
          underlineDisabledStyle={STYLES.disabled}
        />
        <div className={styles.actions}>
          { this.props.actions }

          { canRefresh && (
            <RefreshButton
              onClick={this.refresh}
              isRefreshing={this.state.isRefreshing}
            />
          )}
        </div>
      </div>
    );
  }
}

DeviceSelector.propTypes = {
  // component may take new
  fetchDevices: PropTypes.func.isRequired,

  // sometimes we need to reset search value of component
  reset: PropTypes.bool,

  // true if no device has been chosen
  hasError: PropTypes.bool,

  // whether textField disabled or not
  disabled: PropTypes.bool,

  // will render RefreshButton within actions layout if set to true
  // true by default
  canRefresh: PropTypes.bool,

  // additional actions for DeviceSelector
  actions: PropTypes.arrayOf(
    PropTypes.node,
  ),

  // Callback function that is fired when a list item is selected,
  // or enter is pressed in the TextField.
  onSelect: PropTypes.func.isRequired,

  // Callback function that is fired when
  // the user updates the TextField.
  onChange: PropTypes.func,

  // list of all devices
  devices: PropTypes.instanceOf(Map).isRequired,

  // set velue by other component
  value: PropTypes.string,

  // list of devices ids not
  // attached to any vehicle
  vacantDevices: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
};

DeviceSelector.defaultProps = {
  disabled: false,
  canRefresh: true,
  hasError: false,
  reset: false,
  actions: null,
  onChange: undefined,
  value: undefined,
};

const mapState = state => ({
  devices: getDevices(state),
  vacantDevices: getVacantDevices(state),
});
const mapDispatch = {
  fetchDevices,
};

const PureDeviceSelector = pure(DeviceSelector);

export default connect(mapState, mapDispatch)(PureDeviceSelector);
