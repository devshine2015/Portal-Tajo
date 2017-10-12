import { StyleSheet } from 'aphrodite/no-important';

const labelBgd = '#d4edeb'; // '#a6dad5';//rgba(0, 0, 0, 0.05)';
const timeStampBorder = 'solid 1px rgba(0, 0, 0, 0.35)';
const lineColor = '#b1b1b1';

const classes = StyleSheet.create({

// ------- time stamp terminal ----------
  timeStampTerminal_container: {
    width: 250,
    height: 25,
    left: -15,
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 12px 0 12px',
    // textAlign: '-webkit-center',
    borderRadius: 16,
    position: 'relative',
    border: `solid 3px ${lineColor}`,
    lineHeight: '20px',
    backgroundColor: labelBgd,
    WebkitPrintColorAdjust: 'exact',
  },

// ------- time stamp ----------
  timeStamp_tick: {
    width: 12,
    height: 12,
    left: -5,
    borderRadius: '50%',
    position: 'relative',
    border: 'solid 3px #e64a19',
  },
  timeStamp_mark_container: {
    pageBreakInside: 'avoid',
    pageBreakAfter: 'auto',
    position: 'relative',
    left: 22,
    top: -10,
  },
  timeStamp_mark_pointer: {
    borderLeft: timeStampBorder,
    borderBottom: timeStampBorder,
    transform: 'rotate(45deg)',
    // backgroundColor: 'red',
    position: 'absolute',
    width: 18,
    height: 18,
    top: 4,
    left: -9,
    backgroundColor: labelBgd,
    WebkitPrintColorAdjust: 'exact',
  },
  timeStamp_mark_body: {
    borderRight: timeStampBorder,
    borderTop: timeStampBorder,
    borderBottom: timeStampBorder,
    // textAlign: '-webkit-center',
    // width: 75,
    paddingRight: 5,
    height: 26,
    position: 'absolute',
    backgroundColor: labelBgd,
    WebkitPrintColorAdjust: 'exact',
  },
// ------- stop over ----------
  stopOver_container: {
    pageBreakInside: 'avoid',
    borderLeft: `dotted 3px ${lineColor}`,
    padding: '24px 7px 24px 17px',
  },

// ------- trip ----------
  trip_container: {
    pageBreakInside: 'avoid',
    position: 'relative',
    borderLeft: `solid 3px ${lineColor}`,
    // borderRadius: '5px',
    padding: '24px 7px 24px 7px',
    // marginLeft: 40,
    // backgroundColor: 'bisque',
    // borderLeft: 'dashed 5px rgba(0, 0, 0, 0.35)',
    /* text-align: right; */
  },
  trip_arrow: {
    borderRight: `solid 3px ${lineColor}`,
    borderBottom: `solid 3px ${lineColor}`,
    transform: 'rotate(45deg)',
    // backgroundColor: 'red',
    position: 'absolute',
    width: 8,
    height: 8,
    bottom: '50%',
    left: -6,
  },
  // no_print: {
  //   '@media print': {
  //     display: 'none !important',
  //   },
  // },

  propContainer: {
    /* width: 100%;*/
    // maxWidth: 400,
    /* color: #FFFFFF;*/
    // font-size: 14px;
    // display: flex;
    // justify-content: space-between;
  },
  titleCell: {
    /* width: 100%;*/
    /* width: 250px;*/
    minWidth: 150,
    whiteSpace: 'nowrap',
    paddingLeft: 7,
    paddingRight: 14,
    /*color: #FFFFFF;*/
    // fontSize: 14,
    /*display: flex;
    justify-content: space-between;*/
  },
  valueCell: {
    /* width: 450px;*/
  },

});

export default classes;
