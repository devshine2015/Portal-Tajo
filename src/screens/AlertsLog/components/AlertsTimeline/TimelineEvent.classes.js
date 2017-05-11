import { StyleSheet } from 'aphrodite/no-important';

const WRAPPER_PADDING = 15;
const TOP_OFFSET = WRAPPER_PADDING + 11;
export const EVENT_LINE_WIDTH = 20;

const classes = StyleSheet.create({
  wrapper: {
    padding: WRAPPER_PADDING,
    border: '1px solid #ddd',
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
    position: 'relative',

    ':not(:last-child)': {
      marginBottom: WRAPPER_PADDING,
    },

    ':before': {
      content: "''",
      position: 'absolute',
      width: EVENT_LINE_WIDTH,
      height: 2,
      backgroundColor: '#ddd',
      right: '100%',
      top: TOP_OFFSET,
    },

    ':after': {
      content: "''",
      position: 'absolute',
      width: 13,
      height: 13,
      // TODO: import colors. teal 200
      backgroundColor: '#80cbc4',
      right: 'calc(100% + 17px)',
      top: TOP_OFFSET - 5,
      borderRadius: '50%',
    },
  },

  time: {
    position: 'absolute',
    fontSize: 12,
    right: 'calc(100% + 36px)',
    top: WRAPPER_PADDING + 2,
    whiteSpace: 'nowrap',
  },

  iconWrapper: {
    marginRight: 15,
  },

  detailsWrapper: {},

  detailsHeader: {
    fontWeight: 700,
    marginBottom: 7,
  },

  detailsBody: {
    fontSize: 14,
    color: 'rgba(0,0,0,.75)',
  },
});

export default classes;
