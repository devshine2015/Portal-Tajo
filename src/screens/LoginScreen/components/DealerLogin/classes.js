import { StyleSheet } from 'aphrodite/no-important';

const FUSO_PRIMARY = '#cf0721';

const classes = StyleSheet.create({
  page: {},
  fakeBar: {
    backgroundColor: FUSO_PRIMARY,
    height: 64,
  },
  page__inn: {
    display: 'flex',
    justifyContent: 'center',
    minHeight: '100%',
  },
  page__content: {
    flexDirection: 'column',
  },
});

export default classes;
