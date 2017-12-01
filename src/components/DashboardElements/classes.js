import { StyleSheet } from 'aphrodite/no-important';
import { theme } from 'configs';

// const contentPadding = 20;
// export const HORIZONTAL = 20;

const classes = StyleSheet.create({
// ---- top level container
  itemBox: {
    margin: '4px',
    padding: '0 8px',
    boxSizing: 'content-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
    // overflow: 'hidden',
  },

  itemBody: {
    backgroundColor: theme.palette.dachboardElementColor,
    border: '1px solid rgba(0,0,0,0.15)',
    borderRadius: '2px',
    boxShadow: '0 1px 5px rgba(0,0,0,0.4)',
  },
  dataItemTitle: {
    margin: '4px',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    color: 'white',
    fontSize: 'small',
  },
  dataItemTitleDark: {
    margin: '4px',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    color: theme.palette.dachboardElementColor,
  },
  dataItemValueContainer: {
    margin: '8px 32px',
    height: '48px',
    color: 'white',
    textAlign: 'center',
  },
  dataItemValue: {
    fontSize: 'xx-large',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dataItemUnits: {
    fontSize: 'small',
  },

  //
  subCardsContainer: {
    overflow: 'hidden',
    height: '100%',
    backgroundColor: 'transparent',
    display: 'flex',
    border: 'none',
    position: 'relative',
    bottom: '-1px',
  },
  subCard: {
    height: '100%',
    // flex: 1,
    margin: 0,
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'column',
    minWidth: '100px',
  },
  subCardTitle: {
    fontSize: 'initial',
    lineHeight: 'initial',
    fontWeight: 'initial',
    margin: '0 12px 8px',
  },
  subCardValue: {
    lineHeight: 'initial',
    margin: '4px 0 0 0',
  },
  //
  tableDataCell: {
    margin: '2px',
    padding: '0 12px',
    backgroundColor: theme.palette.dachboardElementColor,
  },
});

export default classes;
