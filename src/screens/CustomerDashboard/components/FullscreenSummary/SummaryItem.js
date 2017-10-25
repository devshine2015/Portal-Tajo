import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { css } from 'aphrodite/no-important';
import { summaryItemClasses } from './classes';

class SummaryGridItem extends React.Component {
  timer = null;
  timerIsOn = false;
  state = {
    old: true,
  };

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
        this.state.old !== nextState.old) return true;

    return false;
  }

  render() {
    const {
      temp,
      name,
      speed,
      fuel,
      pos,
      lastUpdate,
    } = this.props;

    console.log(`I has been updated ${name}`);

    return (
      <div className={css(summaryItemClasses.item, this.state.old && summaryItemClasses.item_white)}>
        <div className={css(summaryItemClasses.head)}>
          <div className={css(summaryItemClasses.name)}>{name}</div>
          <div className={css(summaryItemClasses.pos)}>{`${pos.lat}, ${pos.lng}`}</div>
        </div>
        <div className={css(summaryItemClasses.scores)}>
          <div className={css(summaryItemClasses.scores__col)}>
            <span className={css(summaryItemClasses.scores__title)}>Temp</span>
            <span className={css(summaryItemClasses.scores__val)}>{temp}</span>
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
};

SummaryGridItem.defaultProps = {
  temp: '?',
  fuel: '?',
};

export default SummaryGridItem;
