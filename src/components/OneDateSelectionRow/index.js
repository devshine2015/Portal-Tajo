import React from 'react';
import PropTypes from 'prop-types';
import { makePeriodForTwoDays } from 'utils/dateTimeUtils';
import { DateRangeWithButton } from 'components/OneDateRange';
import styles from './styles.css';

const PageHeader = ({ onApply, hasDateSelector, defaultTimeRange }) => (
  <div className={styles.datePickerRow}>
    {hasDateSelector && <div className={styles.datePicker}>
      {
        // if have got defaultTimeRange, but not defined
        // use one month back period
        defaultTimeRange.fromDate === undefined ?
          <DateRangeWithButton
            withTime
            onApply={onApply}
            fromDate={makePeriodForTwoDays().fromDate}
            toDate={makePeriodForTwoDays().toDate}
            button={(
              <button className={styles.datePickerButton}>APPLY</button>
            )}
          />
          :
          // otherwise - what was passed to props
          <DateRangeWithButton
            withTime
            onApply={onApply}
            fromDate={defaultTimeRange.fromDate}
            toDate={defaultTimeRange.toDate}
            button={(
              <button className={styles.datePickerButton}>APPLY</button>
            )}
          />
      }
    </div>}
  </div>
);

PageHeader.propTypes = {
  onApply: PropTypes.func.isRequired,
  hasDateSelector: PropTypes.bool,
  defaultTimeRange: PropTypes.object,
};

PageHeader.defaultProps = {
  hasDateSelector: true,
  // by default - query one month back
  defaultTimeRange: makePeriodForTwoDays(),
};


export default PageHeader;
