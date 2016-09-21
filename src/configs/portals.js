import { serverEnv } from 'configs';

/**
 * Reflect this table
 * https://docs.google.com/spreadsheets/d/1dAFH4JZI1nfmvJ7VPhztBED8D-stGo3uGo2tf9Is5mQ/
 **/
const DEV_PORTALS = [{
  fleet: 'test',
  niceName: 'Test',
}, {
  fleet: 'psl',
  niceName: 'PSL',
}];

const PROD_PORTALS = [{
  fleet: 'belmondgr',
  niceName: 'Belmond GR',
}, {
  fleet: 'nh',
  niceName: 'NH SUPERUSER',
}, {
  fleet: 'nh_mdy',
  niceName: 'NH MDY',
}, {
  fleet: 'nh_pth',
  niceName: 'NH PTH',
}, {
  fleet: 'nh_npt',
  niceName: 'NH NPT',
}, {
  fleet: 'nh_dt',
  niceName: 'NH DEMO',
}, {
  fleet: 'psl',
  niceName: 'PSL',
}, {
  fleet: 'growthmyanmar',
  niceName: 'Growth Myanmar',
}, {
  fleet: 'mobil',
  niceName: 'Mobil1',
}, {
  fleet: 'rgcc',
  niceName: 'RGCC',
}, {
  fleet: 'mgrock',
  niceName: 'MgRock',
}, {
  fleet: 'yoma',
  niceName: 'Yoma',
}, {
  fleet: 'powerbuy',
  niceName: 'Power Buy',
}, {
  fleet: 'wasuthagroup',
  niceName: 'Wasutha Group',
}, {
  fleet: 'demo',
  niceName: 'Demo',
}];

export default serverEnv !== 'dev' ? PROD_PORTALS : DEV_PORTALS;
