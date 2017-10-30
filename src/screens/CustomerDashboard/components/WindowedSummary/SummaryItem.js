import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Clipboard from 'clipboard/dist/clipboard';
import { css } from 'aphrodite/no-important';
import cs from 'classnames';
import { summaryItemClasses } from './classes';

class SummaryGridItem extends React.Component {
  copyBtn = null;
  clipbrd = null;
  timer = null;
  timerIsOn = false;
  state = {
    old: true,
    coplied: false,
  };

  componentDidMount() {
    this.clipbrd = new Clipboard(this.copyBtn, {
      text: () => `${this.props.pos.lat}, ${this.props.pos.lng}`,
    });

    this.clipbrd.on('success', (e) => {
      this.setState(() => ({
        copied: true,
      }), () => {
        window.setTimeout(() => {
          this.setState(() => ({
            copied: false,
          }));
        }, 4000);
      });

      e.clearSelection();
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.lastUpdate !== nextProps.lastUpdate) {
      this.markGreen();
    }
  }

  markGreen() {
    window.clearTimeout(this.timer);
    this.timerIsOn = false;

    console.log(`Mark green ${this.props.name}`);

    this.setState(() => ({
      old: false,
    }), () => {
      this.timer = window.setTimeout(() => {
        // if next update happened within 2000
        // we should cancel timer run on previous update
        if (this.timerIsOn) {
          this.setState(() => ({
            old: true,
          }));
        }
      }, 2000);
      this.timerIsOn = true;
    });
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.lastUpdate !== nextProps.lastUpdate ||
        this.state.old !== nextState.old ||
        this.state.copied !== nextState.copied) return true;

    return false;
  }

  componentWillUnmount() {
    window.clearTimeout(this.timer);
  }

  saveRef = (node) => {
    if (!node) return;

    this.copyBtn = node;
  }

  render() {
    const {
      temp,
      name,
      speed,
      fuel,
      lastUpdate,
    } = this.props;

    console.log(`copied ${this.state.copied}`);

    const tempClass = cs(css(summaryItemClasses.scores__val), {
      [css(summaryItemClasses.scores__val_tempAlert)]: this.props.tempAlert,
    });

    return (
      <div className={css(summaryItemClasses.item, this.state.old && summaryItemClasses.item_white)}>
        <div className={css(summaryItemClasses.head)}>
          <div className={css(summaryItemClasses.name)}>{name}</div>
          { this.state.copied ?
            <div className={css(summaryItemClasses.pos, summaryItemClasses.pos_copied)}>
              Copied!
            </div> : (
              <div
                ref={this.saveRef}
                role="button"
                tabIndex={0}
                className={css(summaryItemClasses.pos)}
              >
                Copy coordinates
              </div>
            )}
        </div>
        <div className={css(summaryItemClasses.scores)}>
          <div className={css(summaryItemClasses.scores__col)}>
            <span className={css(summaryItemClasses.scores__title)}>Temp</span>
            <span className={tempClass}>{temp}</span>
          </div>
          <div className={css(summaryItemClasses.scores__col)}>
            <span className={css(summaryItemClasses.scores__title)}>Speed</span>
            <span className={css(summaryItemClasses.scores__val)}>{speed}</span>
          </div>
          <div className={css(summaryItemClasses.scores__col)}>
            <span className={css(summaryItemClasses.scores__title)}>Fuel</span>
            <span className={css(summaryItemClasses.scores__val)}>{fuel}</span>
          </div>
        </div>
        <div className={css(summaryItemClasses.time)}>
          {`Updated at ${moment(lastUpdate).format('DD/MM/YYYY HH:mm:ss')}`}
        </div>
      </div>
    );
  }
}

SummaryGridItem.propTypes = {
  id: PropTypes.string.isRequired,
  temp: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  name: PropTypes.string.isRequired,
  speed: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  fuel: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  pos: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }).isRequired,
  lastUpdate: PropTypes.number.isRequired,
  tempAlert: PropTypes.bool, 
};

SummaryGridItem.defaultProps = {
  temp: '?',
  fuel: '?',
  tempAlert: false,
};

export default SummaryGridItem;
