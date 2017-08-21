import { StyleSheet } from 'aphrodite/no-important';
import theme from 'configs/theme';

export default StyleSheet.create({
  header: {
    padding: 10,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  datePlaceholder: {
    textTransform: 'uppercase',
    color: theme.palette.secondaryTextColor,
    transition: 'all .3s',
    cursor: 'pointer',
    fontSize: 12,

    ':hover': {
      textDecoration: 'underline',
      color: theme.palette.primary1Color,
    },
  },
});
