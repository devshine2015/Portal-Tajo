import { StyleSheet } from 'aphrodite/no-important';

const classes = StyleSheet.create({
  footer: {
    position: 'absolute',
    left: 40,
    bottom: 34,
    display: 'flex',
    alignItems: 'center',
  },
  footer__logo: {
    width: 25,
    marginRight: 7,
    color: '#111',
  },
  footer__text: {
    color: '#666',
    fontSize: 13,
  },
});

export default classes;
