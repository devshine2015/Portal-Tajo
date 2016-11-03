import { StyleSheet } from 'aphrodite/no-important';

const classes = StyleSheet.create({
  dashboard: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    padding: 20,
  },
  dashboard__summaryGroup: {
    width: '70%',
    height: 300,

    '@media (max-width: 600px)': {
      height: 'auto',
    },
  },
});

export default classes;
