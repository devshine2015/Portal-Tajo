import React from 'react';

const shape = React.PropTypes.shape;
const string = React.PropTypes.string;

const phrases = {
  en: {
    reports: 'reports',
    vehicles: 'vehicles editor',
    users: 'users manager',
    operational: 'operational',
    settings: 'settings',
    dashboard: 'dashboard',
    installer: 'installer',
    promos: 'promos',
    devices: 'devices manager',
    review: 'review',
    history: 'history',
    alerts: 'alerts editor',
  },

  th: {
    reports: 'รายงาน',
    vehicles: 'จัดการยานพาหนะ',
    users: 'users manager',
    operational: 'ปฏิบัติการ',
    settings: 'ตั้งค่า',
    dashboard: 'dashboard',
    installer: 'installer',
    promos: 'promos',
    devices: 'devices manager',
    review: 'ภาพรวม',
    history: 'ประวัติ',
    alerts: 'alerts editor',
  },
};

export const phrasesShape = shape({
  reports: string.isRequired,
  vehicles: string.isRequired,
  users: string.isRequired,
  operational: string.isRequired,
  settings: string.isRequired,
  dashboard: string.isRequired,
  installer: string.isRequired,
  promos: string.isRequired,
  devices: string.isRequired,
  review: string.isRequired,
  history: string.isRequired,
  alerts: string.isRequired,
});

export default phrases;
