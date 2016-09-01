import React from 'react';
import pure from 'recompose/pure';
import TextField from 'material-ui/TextField';

import styles from './styles.css';

const STYLES = {
  inputStyle: {
    paddingLeft: 15,
    paddingRight: 15,
    lineHeight: 20,
  },
  underline: {
    borderBottom: '1px solid #E64A19',
  },
};

class Filter extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      previousValueLength: null,
    };
  }

  onFiltering = (e) => {
    const value = e.target.value.trim().toLowerCase();

    const isClearing = value.length < this.state.previousValueLength;
    this.props.filterFunc(value, isClearing);

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
          onChange={this.onFiltering}
          hintText="Search"
          underlineShow={false}
          underlineStyle={STYLES.underline}
        />
      </div>
    );
  }
}

Filter.propTypes = {
  filterFunc: React.PropTypes.func.isRequired,

  // TODO -- think about presets
  presets: React.PropTypes.shape({}),
};

export default pure(Filter);
