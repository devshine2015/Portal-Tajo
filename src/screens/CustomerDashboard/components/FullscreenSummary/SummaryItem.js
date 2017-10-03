import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite/no-important';
import { summaryItemClasses } from './classes';

const MIN_FONT_SIZE = 10;
const MIN_WIDTH = 170; // min width of the container is 170px;
/**
 * font size factor for given minimal width and font size
 * Use it to restore proportion when container's width varies from MIN_WIDTH
 * @example
 * 10 / 170 ~ 0.05882, or 5.882% of the container width
 */
const FACTOR = MIN_FONT_SIZE / MIN_WIDTH;

class SummaryGridItem extends React.Component {
  ref = null;
  state = {
    baseFontSize: MIN_FONT_SIZE,
  };

  componentDidMount() {
    this.calcBaseSize();
  }

  calcBaseSize = () => {
    if (this.ref === null) return;

    const { width } = this.ref.getBoundingClientRect();
    this.setState(() => ({
      baseFontSize: FACTOR * width,
    }));
  }

  saveRef = (ref) => {
    if (ref !== null) {
      this.ref = ref;
    }
  }

  render() {
    const {
      temp,
      name,
      speed,
      fuel,
      pos,
      updatedAt,
    } = this.props;

    return (
      <div
        style={{
          fontSize: this.state.baseFontSize,
        }}
        className={css(summaryItemClasses.item)}
        ref={this.saveRef}
      >
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
          {`Updated at ${updatedAt}`}
        </div>
      </div>
    );
  }
}

SummaryGridItem.propTypes = {
  temp: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  name: PropTypes.string.isRequired,
  speed: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  fuel: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  pos: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }).isRequired,
  updatedAt: PropTypes.number.isRequired,
};

export default SummaryGridItem;
