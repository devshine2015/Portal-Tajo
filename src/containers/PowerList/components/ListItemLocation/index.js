import React from 'react';
import pure from 'recompose/pure';
import styles from './styles.css';

class ListItemLocation extends React.Component {
  onClick = () => {
    this.props.onClick(this.props.locationObj.id);
  }
  render() {
    // collapsed view
    if (!this.props.isSelected) {
      return (
        <div
          className={styles.listItem}
          onClick={this.onClick}
        >
          <div > {this.props.locationObj.name} </div>
        </div>
      );
    }
    // selected/exapnded view
    return (
      <div
        className={ this.props.isSelected ? styles.listItemSelected : styles.listItem}
        onClick={this.onClick}
      >
        <div > {this.props.locationObj.name} </div>
        <div className={styles.link}>
          {`Radius: ${this.props.locationObj.radius.toFixed(0)} m`}
        </div>
      </div>
    );
  }
}

ListItemLocation.propTypes = {
  locationObj: React.PropTypes.object,
  onClick: React.PropTypes.func.isRequired,
  isSelected: React.PropTypes.bool.isRequired,
};

const PureListItemLocation = pure(ListItemLocation);

export default PureListItemLocation;
