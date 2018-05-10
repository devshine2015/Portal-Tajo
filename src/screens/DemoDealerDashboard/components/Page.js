import React from 'react';
import classnames from 'classnames';
import styles from './styles.css';


class DealerDashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <div className={styles.overviewWrapper}>
        {/* title row */}
        <div className={styles.infoSectionsWrapper}>
          <div className={styles.infoSection}>
            <h3 className={styles.infoSectionTitle}>Reporting Vehicles</h3>
            <div className={styles.infoSectionValue}>3 / 4</div>
          </div>
          <div className={styles.infoSection}>
            <h3 className={styles.infoSectionTitle}>Reporting Vehicles</h3>
            <div className={styles.infoSectionValue}>3 / 4</div>
          </div>
          <div className={styles.infoSection}>
            <h3 className={styles.infoSectionTitle}>Reporting Vehicles</h3>
            <div className={styles.infoSectionValue}>3 / 4</div>
          </div>
          <div className={styles.infoSection}>
            <h3 className={styles.infoSectionTitle}>Reporting Vehicles</h3>
            <div className={styles.infoSectionValue}>3 / 4</div>
          </div>
          <div className={styles.infoSection}>
            <h3 className={styles.infoSectionTitle}>Reporting Vehicles</h3>
            <div className={styles.infoSectionValue}>3 / 4</div>
          </div>
          <div className={styles.infoSection}>
            <h3 className={styles.infoSectionTitle}>Reporting Vehicles</h3>
            <div className={styles.infoSectionValue}>3 / 4</div>
          </div>

        </div>
        {/* details */}
        <div className={styles.visualSectionsWrapper}>
          <div className={styles.visualSectionsRow}>
            <div className={styles.visualSection}>
              <div className={styles.visualSectionLeft}>
                <h3 className={styles.visualSectionTitle}>Fuel Consumption</h3>
                <div className={styles.donutWrapper}></div>
              </div>
              <div className={styles.visualSectionRight}>
                <div className={styles.extraValues}>
                  <div className={styles.extraValue}>
                    <span className={styles.extraValueNumber}>9,401</span>
                    <span className={styles.extraValueLabel}>Total liters</span>
                  </div>
                  <div className={styles.extraValue}>
                    <span className={styles.extraValueNumber}>3.0</span>
                    <span className={styles.extraValueLabel}>km per liter</span>
                  </div>
                </div>
                <div className={styles.valuesSection}>
                  <div className={styles.valuesRow}>
                    <span className={classnames(styles.title, styles.lossLabel)}>Fuel loss</span>
                    <span className={styles.value}>61%</span>
                  </div>
                  <div className={styles.valuesRow}>
                    <span className={classnames(styles.title, styles.idleLabel)}>idle fuel</span>
                    <span className={styles.value}>24%</span>
                  </div>
                  <div className={styles.valuesRow}>
                    <span className={classnames(styles.title, styles.gainLabel)}>Fuel Gain</span>
                    <span className={styles.value}>16%</span>
                  </div>
                </div>
              </div>

            </div>
            <div className={styles.visualSection}></div>
          </div>
          <div className={styles.visualSectionsRow}>
            <div className={styles.visualSection}></div>
            <div className={styles.visualSection}></div>
          </div>
        </div>
      </div>
    );
  }
}

export default DealerDashboard;
