import { StyleSheet } from 'aphrodite/no-important';

const classes = StyleSheet.create({
  overlay: {
    position: 'absolute',
    backgroundColor: '#fff',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },

  overlay__inn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});

export default classes;
