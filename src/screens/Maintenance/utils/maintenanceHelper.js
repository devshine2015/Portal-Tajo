// const 
export const MaintenanceStatus = {
  loading: 'load',
  ok: 'ok',
  soon: 'soon',
  overdue: 'over',
};


export const makeMaintenanceData = (theVehicle = null, maintenanceAlert = null) => {
  if (theVehicle === null) {
    return { maintenance: { status: MaintenanceStatus.loading, toNextServiceKm: 0, toNextServicePerc: 0 } };
  }
  // if no maintanence alert attached - default to 25k
  const mnyCycle = maintenanceAlert != null ? maintenanceAlert.odoValue : 25000;
  const mntZero = theVehicle.lastServiceOdo;
  const mntEnd = theVehicle.lastServiceOdo + mnyCycle;
  const vehCurrentKm = theVehicle.dist.total / 1000;
  const distToNextService = mntEnd - vehCurrentKm;
  
  const maintenance = {};
  maintenance.toNextServiceKm = distToNextService;
  maintenance.toNextServicePerc = 100 * ((vehCurrentKm - mntZero) / (mntEnd - mntZero));

  if (distToNextService > 1000) maintenance.status = MaintenanceStatus.ok;
  else if (distToNextService > 0) maintenance.status = MaintenanceStatus.soon;
  else maintenance.status = MaintenanceStatus.overdue;
  return { maintenance };
};
