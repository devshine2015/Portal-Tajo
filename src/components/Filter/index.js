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

  constructor(props) {
    super(props);

    this.state = {
      previousValueLength: null,
    };
  }

  onTextChange = (e) => {
    console.time('filtering');

    const value = e.target.value.trim().toLowerCase();

    const isClearing = value.length < this.state.previousValueLength;

    this.props.onFilterFinish(value, isClearing);

    this.setState({
      previousValueLength: value.length,
    });
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
  onFilterFinish: React.PropTypes.func.isRequired,
  // filterFunc: React.PropTypes.func.isRequired,

  // TODO -- think about presets
  presets: React.PropTypes.shape({}),
};

export default pure(Filter);
