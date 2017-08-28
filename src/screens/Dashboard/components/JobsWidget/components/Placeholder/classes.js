import { StyleSheet } from 'aphrodite/no-important';
import theme from 'configs/theme';

export default StyleSheet.create({
  placeholder: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 30,
    color: theme.palette.secondaryTextColor,
    flex: 1,
    textTransform: 'uppercase',
    fontWeight: 700,
  },
});
