import React from 'react';
import Oil from 'assets/images/svg_icons/oil.svg';
import Brake from 'assets/images/svg_icons/brake.svg';
// import Worker from 'assets/images/svg_icons/worker.svg';
import Warning from 'assets/images/svg_icons/warning.svg';
import Engine from 'assets/images/svg_icons/engine.svg';

import OverviewIcon from 'assets/images/svg_icons/main_menu/overview.svg';
// import AlertEditorIcon from 'assets/images/svg_icons/main_menu/alert_editor.svg';
import DeviceManagerIcon from 'assets/images/svg_icons/main_menu/devices_manager.svg';
import AlertLogsIcon from 'assets/images/svg_icons/main_menu/alert_logs.svg';
import DriveComparisonIcon from 'assets/images/svg_icons/main_menu/drive_comparison.svg';
import FuelUsageIcon from 'assets/images/svg_icons/main_menu/fuel_usage.svg';
// import InstallerIcon from 'assets/images/svg_icons/main_menu/installer.svg';

import ProfileIcon from 'assets/images/svg_icons/main_menu/profile.svg';
import TruckIcon from 'assets/images/svg_icons/main_menu/truck.svg';
import UsersIcon from 'assets/images/svg_icons/main_menu/users.svg';
// import VehicleDiagIcon from 'assets/images/svg_icons/main_menu/vehicle_diag.svg';
// import VehicleEditorIcon from 'assets/images/svg_icons/main_menu/vehicle_editor.svg';


// const OverviewIcon = Brake; 
// const DriveComparisonIcon = Oil;
const AlertEditorIcon = Warning;
// const DeviceManagerIcon = Brake;
// const AlertLogsIcon = Engine;
// const FuelUsageIcon = Oil;
const InstallerIcon = Brake;
// const ProfileIcon = Brake;
// const TruckIcon = Engine;
// const UsersIcon  = Brake;
const VehicleDiagIcon = Engine;
const VehicleEditorIcon = Oil;


const iconHeight = "24";

const menu = {
  dashboard: {
    name: 'overview',
    icon: (<OverviewIcon height={iconHeight} />),
    path: '',
    requireOneOfPermissions: ['view:dashboards'],
  },
  users: {
    name: 'users',
    icon: (<UsersIcon height={iconHeight} />),
    path: 'users',
    requireOneOfPermissions: ['view:dashboards'],
  },
  vehicles: {
    name: 'vehicles_editor',
    icon: (<VehicleEditorIcon height={iconHeight} />),
    path: 'vehicles',
  },
  fuelUsage: {
    name: 'fuel_usage',
    path: 'fuelusage',
    icon: (<FuelUsageIcon height={iconHeight} />),
    requireOneOfPermissions: ['view:dashboards'],
  },
  driveComparison: {
    name: 'drive_comparison',
    icon: (<DriveComparisonIcon height={iconHeight} />),
    path: 'comparison',
    requireOneOfPermissions: ['view:dashboards'],
  },
  alerts: {
    name: 'alerts_editor',
    icon: (<AlertEditorIcon height={iconHeight} />),
    path: 'alerts',
    requireOneOfPermissions: ['view:dashboards'],
  },
  maintenance: {
    name: 'vehicle_maintenance',
    icon: (<VehicleDiagIcon height={iconHeight} />),
    path: 'maintenance',
    requireOneOfPermissions: ['view:dashboards'],
  },
  installer: {
    name: 'installer',
    icon: (<InstallerIcon height={iconHeight} />),
    path: 'installer',
  },
  devices: {
    name: 'devices_manager',
    icon: (<DeviceManagerIcon height={iconHeight} />),
    path: 'devices',
  },
  fleetManager: {
    name: 'fleet_manager',
    icon: (<AlertLogsIcon height={iconHeight} />),
    path: 'fleetmanager',
    requireOneOfPermissions: ['add:sub_fleet'],
  },
};

export default menu;
