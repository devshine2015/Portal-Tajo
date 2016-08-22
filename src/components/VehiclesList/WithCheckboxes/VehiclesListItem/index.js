import React from 'react';
import pure from 'recompose/pure';


class ListItemWithCheckbox extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isChecked: false,
    };
  }

  componentWillUnmount() {
    if (this.props.uncheckOnUnmount && this.state.isChecked) {
      this.props.onClick(this.props.id, false);
    }
  }

  onClick = (e) => {
    const isChecked = e.target.checked;

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
      <div className="vehicles-list_item">
        <label>
          <input type="checkbox" onClick={this.onClick} />
          {this.props.name}
        </label>
      </div>
    );
  }
}

ListItemWithCheckbox.propTypes = {
  id: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired,
  uncheckOnUnmount: React.PropTypes.bool,
};

export default pure(ListItemWithCheckbox);
