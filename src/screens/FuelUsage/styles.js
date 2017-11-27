import { StyleSheet } from 'aphrodite/no-important';
import { theme } from 'configs';

module.exports = StyleSheet.create({
  tableHead: {
    color: theme.palette.dachboardElementColor,
    height: '32px',
    padding: '4px 16px',
    margin: '4px',
  },
  tableCellAlerts: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 8px',
  },
  subText: {
    fontSize: 'large',
    lineHeight: 'initial',
    textAlign: 'center',
    width: '35%',
    paddingTop: '5px',
  },
  subBadge: {
    width: '56px',
    minWidth: '56px',
    height: '56px',
    lineHeight: '56px',
    borderRadius: '50%',
    textAlign: 'center',
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#fff',
  },
  container: {
    marginTop: '32px',
  },
  containerHeading: {
    fontSize: 'larger',
    color: '#000',
  },
});
