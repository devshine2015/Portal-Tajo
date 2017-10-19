import { StyleSheet } from 'aphrodite/no-important';

// const contentPadding = 20;
// export const HORIZONTAL = 20;

const classes = StyleSheet.create({
// ---- top level container
  dataItemContainer: {
    // marginTop: '48px',
    margin: '16px',
    // padding: '8px 24px',
    // height: '64px',
    // backgroundColor: '#c4c2b1',
    backgroundColor: '#439e47',
    border: '1px solid rgba(0,0,0,0.15)',
    borderRadius: '2px',
    boxShadow: '0 1px 5px rgba(0,0,0,0.4)',
    overflow: 'hidden',
  },
  dataItemTitle: {
    margin: '4px',
    textAlign: 'center',
    color: 'white',
  },
  dataItemTitleDark: {
    margin: '4px',
    textAlign: 'center',
    color: '#439e47',
  },  
  dataItemValueContainer: {
    margin: '8px 32px',
    fontSize: 'xx-large',
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
});

export default classes;
