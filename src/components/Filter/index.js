import React from 'react';
import pure from 'recompose/pure';
import TextField from 'material-ui/TextField';

import styles from './styles.css';

const STYLES = {
  inputStyle: {
    paddingLeft: 15,
    paddingRight: 15,
  },
};

class Filter extends React.Component {

  onTextChange = (e) => {
    const value = e.target.value.trim().toLowerCase();

    this.props.onTextChange(value);
  }

  render() {
    return (
      <div className={styles.filterContainer}>
        <TextField
          fullWidth
          inputStyle={STYLES.inputStyle}
          hintStyle={STYLES.inputStyle}
          onChange={this.onTextChange}
          hintText="Search"
        />
      </div>
    );
  }
}

Filter.propTypes = {
  onTextChange: React.PropTypes.func.isRequired,
};

export default pure(Filter);
