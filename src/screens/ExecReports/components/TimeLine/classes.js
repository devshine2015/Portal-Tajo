import { StyleSheet } from 'aphrodite/no-important';

const classes = StyleSheet.create({
  timeStamp_container: {
    border: 'solid 5px rgba(0, 0, 0, 0.35)',
    // borderRadius: '50%',
    position: 'relative',
    left: -20,
    textAlign: '-webkit-center',
    borderRadius: 18,
    // backgroundColor: 'aliceblue',
    // padding: '7px',
    // backgroundColor: '#b3d4fc',
    // /* text-align: right; */
    width: 175,
  },

  stopOver_container: {
    // border: 'solid 1px rgba(0, 0, 0, 0.24)',
    borderLeft: 'double 16px rgba(0, 0, 0, 0.35)',
    // borderRadius: '5px',
    padding: '7px',
    // backgroundColor: 'aliceblue',
    /* text-align: right; */
    // width: '300px',
  },
  trip_container: {
    position: 'relative',
    // border: 'solid 1px rgba(0, 0, 0, 0.24)',
    // borderRadius: '5px',
    padding: '7px',
    marginLeft: 40,
    // backgroundColor: 'bisque',
    // borderLeft: 'dashed 5px rgba(0, 0, 0, 0.35)',
    /* text-align: right; */
  },
  trip_arrow: {
    fontSize: 94,
    position: 'absolute',
    left: -40,
    bottom: -30,
    color: 'rgba(0, 0, 0, 0.35)',
  },
  // no_print: {
  //   '@media print': {
  //     display: 'none !important',
  //   },
  // },

   propContainer: {
    /*width: 100%;*/
    // maxWidth: 400,
    /*color: #FFFFFF;*/
    // font-size: 14px;
    // display: flex;
    // justify-content: space-between;
  },
  titleCell: {
    /*width: 100%;*/
    /*width: 250px;*/
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
    /*width: 450px;*/
  },
 
});

export default classes;
