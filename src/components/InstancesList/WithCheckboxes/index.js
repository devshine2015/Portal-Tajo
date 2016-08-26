import React from 'react';
import pure from 'recompose/pure';

import styles from '../styles.css';

class ListItemWithCheckbox extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isChecked: props.isChecked,
    };
  }

  componentWillUnmount() {
    if (this.props.uncheckOnUnmount && this.state.isChecked) {
      this.props.onClick(this.props.id, false);
    }
  }

  onClick = () => {
    const isChecked = !this.state.isChecked;

    this.setState({ isChecked }, () => {
      this.props.onClick(this.props.id, isChecked);
    });
  }

  render() {
    /**
     * Don't using material-ui/Checkbox due to performance
     * lags while filtering
     **/
    return (
      <label className={styles.listItemInn}>
        <input
          type="checkbox"
          onChange={this.onClick}
          checked={this.state.isChecked}
        />
        {this.props.name}
      </label>
    );
  }
}

ListItemWithCheckbox.propTypes = {
  id: React.PropTypes.string.isRequired,
  isChecked: React.PropTypes.bool.isRequired,
  name: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired,
  uncheckOnUnmount: React.PropTypes.bool,
};

export default pure(ListItemWithCheckbox);
