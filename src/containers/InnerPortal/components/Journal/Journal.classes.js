import { StyleSheet } from 'aphrodite/no-important';

const TRIANGLE_BASE_WIDTH = 10;
const TRIANGLE_HEIGHT = TRIANGLE_BASE_WIDTH * 1.5;

export default StyleSheet.create({
  journal: {
    width: 300,
    position: 'relative',

    ':after': {
      content: '""',
      position: 'absolute',
      top: -TRIANGLE_HEIGHT,
      right: (48 / 2) - TRIANGLE_BASE_WIDTH,
      borderLeft: `${TRIANGLE_BASE_WIDTH}px solid transparent`,
      borderRight: `${TRIANGLE_BASE_WIDTH}px solid transparent`,
      borderBottom: `${TRIANGLE_HEIGHT}px solid #fff`,
      width: 0,
      height: 0,
    },
  },

  header: {
    textAlign: 'center',
  },

  header__text: {
    fontSize: 12,
    fontWeight: 500,
    textTransform: 'uppercase',
    lineHeight: '40px',
  },

  placeholder: {
    fontSize: 12,
    textTransform: 'uppercase',
    lineHeight: '40px',
    textAlign: 'center',
    color: '#999',
  },

  entries: {
    listStyleType: 'none',
    maxHeight: '23vmax',
    overflowY: 'auto',
  },

  entries__item: {
    borderBottom: '1px solid #eaeaea',
  },

  entry: {
    fontSize: 13,
    padding: 10,
  },
});
