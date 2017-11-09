import { StyleSheet } from 'aphrodite/no-important';

const classes = StyleSheet.create({
  vehicleIcon: {
    position: 'absolute',
    left: 15,
    width: 32,
    height: 32,
  },

  kind: {
    display: 'flex',
  },

  selectedKindIcon: {
    marginLeft: 15,
    marginTop: 15,
    display: 'inline-block',
  },
});

export default classes;
