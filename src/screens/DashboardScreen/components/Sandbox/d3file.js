// work with d3 here
import * as d3 from 'd3';

// next 2 constants required for integration d3
// into react virtual DOM
// check for reference:
// https://github.com/react-d3-library/react-d3-library
const node = document.createElement('div');
d3.select(node).append('svg');


// keep this default export
export default node;
