import { StyleSheet } from 'aphrodite/no-important';
import { EVENT_LINE_WIDTH } from './TimelineEvent.classes';

const TIMELINE_WIDTH = 6;
const LIST_LEFT_PADDING = 120;

const classes = StyleSheet.create({
  wrapper: {
    maxWidth: 500,
  },

  header: {
    margin: '20px 0 15px',
    textAlign: 'center',
  },

  header__main: {
    fontSize: 18,
    marginBottom: 5,
  },

  header__sub: {
    color: 'rgba(0,0,0,.55)',
    fontSize: 14,
  },

  header__sub_highlighted: {
    fontWeight: 600,
    fontSize: 15,
  },

  filter: {
    marginBottom: 16,
  },

  filter__label: {
    width: LIST_LEFT_PADDING,
    paddingRight: EVENT_LINE_WIDTH,
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

  listWrapper_empty: {
    padding: 0,
    fontSize: 28,
    fontWeight: 600,
    color: '#ccc',
    textAlign: 'center',

    ':before': {
      display: 'none',
    },
  },
});

export default classes;
