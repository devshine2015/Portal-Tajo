import React from 'react';
import pure from 'recompose/pure';

class SimpleListItem extends React.Component {

  onClick = () => {
    this.props.onClick(this.props.id);
  }

  render() {
    return (
      <div
        className="vehicles-list_item"
        onClick={this.onClick}
      >
        {this.props.name}
      </div>
    );
  }
}

SimpleListItem.propTypes = {
  id: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired,
};

export default pure(SimpleListItem);
