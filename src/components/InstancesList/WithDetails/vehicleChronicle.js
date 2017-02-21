import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import classnames from 'classnames';
import LinearProgress from 'material-ui/LinearProgress';
import { getInstanceChronicleFrameById } from 'containers/Chronicle/reducer';

import stylesTop from '../styles.css';
import styles from './styles.css';
import { historyDetailsShape } from '../phrases.lang';

class ChronicleListItem extends React.Component {
  onClick = () => {
    this.props.onClick(this.props.id);
  }

  getChronocle = () => { }

  render() {
    const chronicleFrame = this.props.getInstanceChronicleFrameById(this.props.id);
    const className = classnames(stylesTop.listItemInn, {
      [styles.listItemNoChronicle]: (!chronicleFrame.isValid() && !this.props.isExpanded),
    });

    return (
      <div
        className={className}
        onClick={this.onClick}
      >
        {this.props.name}
        { chronicleFrame.isLoading() ?
          <LinearProgress mode="indeterminate" />
          : false
        }
        { chronicleFrame.isEmpty() ?
          <div >
            { this.props.translations.no_data }
          </div>
          : false
        }
      </div>
    );
  }
}

ChronicleListItem.propTypes = {
  id: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  isExpanded: React.PropTypes.bool.isRequired,
  onClick: React.PropTypes.func.isRequired,
  getInstanceChronicleFrameById: React.PropTypes.func.isRequired,

  translations: historyDetailsShape.isRequired,
};

const mapState = (state) => ({
  getInstanceChronicleFrameById: getInstanceChronicleFrameById(state),
});
const PureChronicleListItem = pure(ChronicleListItem);

export default connect(mapState)(PureChronicleListItem);
