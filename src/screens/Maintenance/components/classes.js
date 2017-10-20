import { StyleSheet } from 'aphrodite/no-important';
import { theme } from 'configs';

const classes = StyleSheet.create({
// ---- top level container
  progContainer: {
    marginTop: '48px',
  },
  progBarBody: {
    border: '1px solid rgba(0,0,0,0.15)',
    height: '48px',
    backgroundColor: '#c4c2b1',
    borderRadius: '6px',
    boxShadow: '0 1px 5px rgba(0,0,0,0.4)',
    overflow: 'hidden',
  },
  progBarProg: {
    height: '100%',
    backgroundColor: theme.palette.alertColor, // '#e64a19',
    // borderRight: '1px solid rgba(0, 0, 0, 0.5)',
    boxShadow: '1px 0px 3px rgba(0,0,0,0.4)',
    transition: 'all 0.25s',
  },
  title: {
    border: 'solid 1px',
    height: '48px',
    backgroundColor: 'green',
    borderRadius: '6px',
    overflow: 'hidden',
  },

  lightContainer: {
    marginTop: '48px',
    paddingRight: '24px',
  },
  lightBody: {
    border: '1px solid rgba(0,0,0,0.15)',
    height: '48px',
    width: '48px',
    backgroundColor: '#c4c2b1',
    borderRadius: '50%',
    boxShadow: '0 1px 5px rgba(0,0,0,0.4)',
    overflow: 'hidden',
    margin: 'auto',
  },
  
});

export default classes;
