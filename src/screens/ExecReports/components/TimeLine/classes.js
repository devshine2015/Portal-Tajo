import { StyleSheet } from 'aphrodite/no-important';

const classes = StyleSheet.create({
  timeStamp_container: {
    border: 'solid 1px rgba(0, 0, 0, 0.24)',
    borderRadius: '5px',
    padding: '7px',
    backgroundColor: '#b3d4fc',
    /* text-align: right; */
    marginTop: '10px',
    width: '175px',
  },

  stopOver_container: {
    border: 'solid 1px rgba(0, 0, 0, 0.24)',
    borderRadius: '5px',
    padding: '7px',
    backgroundColor: 'aliceblue',
    /* text-align: right; */
    marginTop: '10px',
    width: '300px',
  },

  // no_print: {
  //   '@media print': {
  //     display: 'none !important',
  //   },
  // },
});

export default classes;
