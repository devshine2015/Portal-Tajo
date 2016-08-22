import React from 'react';
import pure from 'recompose/pure';
import classnames from 'classnames';
import FixedColumn from 'components/FixedColumn';
import PowerListContent from './PowerListContent';
import Filter from 'components/Filter';
import styles from './styles.css';

class PowerList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      filteredList: props.dataList,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.dataList.length !== nextProps.dataList.length) {
      console.log('updated');
      this.setState({
        filteredList: nextProps.dataList,
      });
    }
  }

  onFilter = (value, isClearing) => {
    const filteredList = this.props.filterFunc(this.state.filteredList, this.props.dataList, value, isClearing);

    this.setState({ filteredList }, () => {
      console.timeEnd('filtering');
    });
  }

  render() {
    const columnClassName = classnames(styles.columnContainer, this.props.className);

    return (
      <FixedColumn containerClassName={columnClassName}>

        { this.props.filterFunc && (
          <Filter
            onFilterFinish={this.onFilter}
            // filterFunc={this.props.filterFunc(this.props.dataList)}
          />
        )}

        <PowerListContent
          contentItem={this.props.contentItem}
          dataList={this.state.filteredList}
        />

      </FixedColumn>
    );
  }
}

PowerList.propTypes = {
  // children: React.PropTypes.node.isRequired,
  className: React.PropTypes.string,
  contentItem: React.PropTypes.element.isRequired,
  dataList: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.array,
  ]).isRequired,
  filterFunc: React.PropTypes.func,
};

export default pure(PowerList);
