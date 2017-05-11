import { StyleSheet } from 'aphrodite/no-important';
import { EVENT_LINE_WIDTH } from './TimelineEvent.classes';

const TIMELINE_WIDTH = 6;
const LIST_LEFT_PADDING = 120;

const classes = StyleSheet.create({
  wrapper: {
    width: '100%',
    padding: '0 20px',
  },

  header: {
    margin: '20px 0 15px',
    textAlign: 'center',
  },

  header__main: {},

  header__sub: {
    color: 'rgba(0,0,0,.55)',
    fontSize: 14,
  },

  listWrapper: {
    position: 'relative',
    maxWidth: 500,
    paddingLeft: LIST_LEFT_PADDING,
    margin: '0 auto',

    ':before': {
      content: "''",
      position: 'absolute',
      left: LIST_LEFT_PADDING - EVENT_LINE_WIDTH - TIMELINE_WIDTH,
      width: TIMELINE_WIDTH,
      height: '100%',
      backgroundColor: 'rgba(221, 221, 221, .6)',
      borderRadius: TIMELINE_WIDTH / 2,
    },
  },
});

export default classes;
