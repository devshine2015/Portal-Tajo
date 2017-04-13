import { StyleSheet } from 'aphrodite/no-important';

const classes = StyleSheet.create({
  customControls: {
    position: 'absolute',
    zIndex: 999,
    top: 126,
    left: 10,
  },

  control: {
    position: 'relative',
    backgroundColor: '#fff',
    boxShadow: '0 1px 5px rgba(0,0,0,0.4)',
    borderRadius: 5,
    marginBottom: 10,
    height: 36,
    width: 36,
  },
});

export default classes;
