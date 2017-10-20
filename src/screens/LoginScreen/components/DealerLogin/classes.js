import { StyleSheet } from 'aphrodite/no-important';

// const FUSO_PRIMARY = '#cf0721';
const ccMainBrandColor = '#00619E';
const gray = '#aaa';
const lightGray = '#eee';

const classes = StyleSheet.create({
  page: {
    height: '100%',
    background: `linear-gradient(60deg, ${lightGray}, ${gray})`,
  },
  fakeBar: {
    backgroundColor: ccMainBrandColor,
    height: 64,
  },
  page__inn: {
    display: 'flex',
    justifyContent: 'center',
  },
  page__content: {
    flexDirection: 'column',
  },
});

export default classes;
