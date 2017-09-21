import { StyleSheet } from 'aphrodite/no-important';
import { theme } from 'configs';

export default StyleSheet.create({
  header: {
    padding: 10,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  datePlaceholder: {
    textTransform: 'uppercase',
    color: theme.palette.secondaryTextColor,
    transition: 'color .3s',
    cursor: 'pointer',
    fontSize: 12,

    ':hover': {
      textDecoration: 'underline',
      color: theme.palette.primary1Color,
    },
  },
});
