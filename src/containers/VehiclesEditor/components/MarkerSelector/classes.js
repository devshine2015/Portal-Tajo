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
    display: 'inline-block',
  },
  kindOfSelector: {
    display: 'flex',
    margin: '32px 0 32px 0',
    /*justify-content: space-between;*/
  },
  kindOfLabel: {
    width: 110,
  },
  kindOfName: {
    paddingLeft: 7,
  },
});

export default classes;
