import { StyleSheet } from 'aphrodite/no-important';

const classes = StyleSheet.create({
  wrapper: {
    display: 'flex',
    position: 'relative',
    alignItems: 'center',

    ':after': {
      content: "''",
      position: 'absolute',
      bottom: 7,
      width: '100%',
      height: 1,
      backgroundColor: '#ccc',
    },
  },

  picker: {
    padding: '0 5px',
  },

  picker_big: {
    maxWidth: 95,
  },
});

export default classes;
