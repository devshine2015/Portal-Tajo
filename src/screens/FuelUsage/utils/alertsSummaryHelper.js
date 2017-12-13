
export const summarizeFuelAlerts = (vehicleAlerts, totalConsumption) => {
  const alertsSummaryInitial =
{ lossCount: 0,
  lossAmount: 0,
  lossPerc: 0,
  gainCount: 0,
  gainAmount: 0,
  gainPerc: 0,
};
  const summAlerts = (summary, alert) => {
    if (alert.alertType === 'REFUEL') {
      summary.gainCount++;
      summary.gainAmount += alert.liters;
    } else {
      summary.lossCount++;
      summary.lossAmount += alert.liters;
    }
    return summary;
  };

  const alertsSummary = vehicleAlerts.reduce(summAlerts, alertsSummaryInitial);
  if (totalConsumption > 0) {
    alertsSummary.lossPerc = (100 * alertsSummary.lossAmount) / totalConsumption;
    alertsSummary.gainPerc = (100 * alertsSummary.gainAmount) / totalConsumption;
  }
  return alertsSummary;
};
