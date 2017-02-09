import { StyleSheet } from 'aphrodite/no-important';

const classes = StyleSheet.create({
  dashboard__summaryGroup: {
    width: '70%',
    height: 300,

    '@media (max-width: 600px)': {
      height: 'auto',
    },
  },
});

export default classes;
