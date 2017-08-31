import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import ClearIcon from 'material-ui/svg-icons/content/clear';
import { searchActions } from '../../actions';

import styles from './styles.css';

class DeviceSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchString: '',
    };
  }

  onChange = (e, value) => {
    this.setState({
      searchString: value,
    }, () => {
      this.props.search(value);
    });
  }

  onReset = () => {
    this.setState({
      searchString: '',
    }, () => {
      this.props.searchReset();
    });
  }

  render() {
    return (
      <div className={styles.search}>
        <TextField
          fullWidth
          type="search"
          hintText="Search by IMEI"
          onChange={this.onChange}
          className={styles.textField}
          value={this.state.searchString}
        />
        <div className={styles.resetButton}>
          <IconButton onClick={this.onReset}>
            <ClearIcon />
          </IconButton>
        </div>
      </div>
    );
  }
}

DeviceSearch.propTypes = {
  search: PropTypes.func.isRequired,
  searchReset: PropTypes.func.isRequired,
};

const mapState = null;
const mapDispatch = {
  search: searchActions.search,
  searchReset: searchActions.searchReset,
};

const DevicePureSearch = pure(DeviceSearch);

export default connect(mapState, mapDispatch)(DevicePureSearch);
