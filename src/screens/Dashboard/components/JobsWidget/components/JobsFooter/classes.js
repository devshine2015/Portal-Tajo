import { StyleSheet } from 'aphrodite/no-important';
import { theme } from 'configs';

export default StyleSheet.create({
  footer: {
    textAlign: 'right',
    padding: '5px 20px',
  },
  updatedAt: {
    fontSize: 12,
    color: theme.palette.secondaryTextColor,
  },
});
