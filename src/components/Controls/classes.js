import { StyleSheet } from 'aphrodite/no-important';

const classes = StyleSheet.create({
  form_buttons: {
    textAlign: 'right',
    marginTop: 10,
  },

  no_print: {
    '@media print': {
      display: 'none !important',
    },
  },
});

export default classes;
