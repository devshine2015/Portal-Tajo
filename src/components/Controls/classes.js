import { StyleSheet } from 'aphrodite/no-important';

const classes = StyleSheet.create({
  form_buttons: {
    textAlign: 'center',
    margin: '10px 0',
  },

  no_print: {
    '@media print': {
      display: 'none !important',
    },
  },
});

export default classes;
