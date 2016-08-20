import React from 'react';
import pure from 'recompose/pure';
// import ListItem from './../ListItem';
import styles from './styles.css';

class ItemProperty extends React.Component {

//           {`${this.props.title}:`}

  render() {
    return (
      <div className={styles.propContainer}>
        <span className={styles.propTitle}>
          {this.props.title === '' ? this.props.icon : `${this.props.title}:`}
        </span>
        <span className={styles.propValue}>
          {this.props.value}
        </span>
      </div>
     );
  }
}

ItemProperty.propTypes = {
  title: React.PropTypes.string.isRequired,
  icon: React.PropTypes.obj,
  value: React.PropTypes.string.isRequired,
};

const PureItemProperty = pure(ItemProperty);

export default PureItemProperty;
