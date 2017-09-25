import { StyleSheet } from 'aphrodite/no-important';

const classes = StyleSheet.create({
  titleElement: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  },
  logos: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    width: 160,
  },
  logo__img: {
    maxWidth: '100%',
    height: 'auto',
  },
});

export default classes;
