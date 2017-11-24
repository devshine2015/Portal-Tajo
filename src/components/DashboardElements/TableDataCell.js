import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import { css } from 'aphrodite/no-important';
// import { theme } from 'configs';

import classes from './classes';

const TableDataCell = ({
  dataString,
  dataUnits,
  style,
}) => {
  const className = css(classes.dataItemValueContainer, classes.tableDataCell);// , inClasses.tableCellCard));
  return (
    <td>
      <div className={className} style={style}>
        <spawn className={css(classes.dataItemValue)}>{dataString}</spawn>
        { dataUnits !== undefined && <span className={css(classes.dataItemUnits)}>{dataUnits}</span>}
      </div>
    </td>
  );
};

TableDataCell.propTypes = {
  dataString: PropTypes.string.isRequired,
  dataUnits: PropTypes.string,
  style: PropTypes.object,
};

TableDataCell.defaultProps = {
  dataUnits: undefined,
  style: undefined,
};

export default pure(TableDataCell);

